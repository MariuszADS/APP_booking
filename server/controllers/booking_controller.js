import prisma from "../db/prismaClient.js";

export const getBooking = async (req, res) => {
    try {
        const where = req.user?.role === "admin" ? {} : { userId: req.user.id };
        const bookings = await prisma.booking.findMany({
            where,
            include: {
                service: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { date: "asc" }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    console.log("GET ALL");
};

export const getSingleBooking = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const booking = await prisma.booking.findUnique({ where: {id} })
        //below is the right pathern of handling single user/id/booking
        // const booking = await prisma.booking.findUnique({ where: { id: Number(req.params.id)} })
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }
        res.json(booking)
    }
    
    
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    console.log("GET SINGLE",req.params.id);
    // console.log(req.body);
}

export const createBooking = async (req, res) => {
    try {
        const { serviceId, date, comment } = req.body;

        if (!serviceId || !date) {
            return res.status(400).json({ message: "Service and date are required" });
        }

        const service = await prisma.service.findUnique({ where: { id: Number(serviceId) } });
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        const booking = await prisma.booking.create({
            data: {
                userId: req.user.id,
                serviceId: Number(serviceId),
                date: new Date(date),
                comment: comment || null
            },
            include: { service: true }
        })
        res.status(201).json(booking)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    console.log("CREATE BOOKING");
}

export const editBooking = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const booking = await prisma.booking.findUnique({ where: { id } })
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }
        const editedBooking = await prisma.booking.update({
            where: {id},
            data:{
                serviceId: req.body.serviceId ? Number(req.body.serviceId) : booking.serviceId,
                date: req.body.date ? new Date(req.body.date) : booking.date,
                comment: req.body.comment ?? booking.comment
            }
        })
        res.status(200).json(editedBooking)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const deleteBooking = async (req, res) => {
    try {
        const id = Number(req.params.id)
        console.log("PARAMS:", req.params)
        const booking = await prisma.booking.findUnique({ where: { id } })

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }
        const deleteBooking = await prisma.booking.delete({ where: { id } })
        res.status(200).json(deleteBooking)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    console.log("DELETED BOOKING");
}
