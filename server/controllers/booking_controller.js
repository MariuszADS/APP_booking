import prisma from "../db/prismaClient.js";

export const getBooking = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    console.log("GET ALL");
};

export const getSingleBooking = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const booking = await prisma.booking.findUnique({ where: { id } })
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
    console.log(req.body);
}

export const createBooking = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const booking = await prisma.booking.create({
            data: {
                userId: req.body.userId,
                serviceId: req.body.serviceId,
                date: new Date(req.body.date),
                comment: req.body.comment || null
            }
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
                comment:"new text"
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
