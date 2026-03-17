import { Prisma } from "@prisma/client";

//404 not found status handler
//Create error for route taht don't exist
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.orginalUrl} not found`)
    error.statusCode = 404
    next(error)
}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    //handle prisma validation error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint failed on the {constraint}"
        //check if instanse exist if not return field
        if (err.code === "P2002") {
            const field = err.meta?.target?.[0] || "field"
            err.status = 400;
            err.message = `${field} already exist`
        }
        //handle records not found
        if (err.code === "P2025") {
            err.statusCode = 404
            err.message = "Record not found"
        }

    }
    //handle prisma foreign key constraint violation
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        //invalid prisma key
        if (err.code === "P2003") {
            err.statusCode = 400
            err.message = "Invalid Referance: related record does not exist"
        }
    }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    })
}
export { notFound, errorHandler }