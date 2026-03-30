import prisma from "../db/prismaClient.js";

export const getBooking = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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

}
//TO_FIX
export const createBooking = async (req, res) => {
    try {
        const booking = await prisma.booking.create({ data: req.body })
        res.status(201).json(booking)
        console.log("CREATED", booking)
        res.status(201).json(booking)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const editBooking = async (req, res) => {
    try {
        const booking = prisma.booking.update()
        res.json(booking)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//NOT CHECKED
export const deleteBooking = async (req, res) => {
    //user/booking has to be specify for instance { name: "Bob", email: "bob@prisma.io" }
    try {
        const booking = await prisma.booking.delete({ where: { id: 1 } })
        res.status(201).json(booking)
        console.log("DELETED", booking);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
