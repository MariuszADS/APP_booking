
// middleware controller is handling errors server 
export const errorHandler = (err, res, req,next) => {
    console.error(err);
    res.status(500).json({ message: "internal server error" })
    next()
}

