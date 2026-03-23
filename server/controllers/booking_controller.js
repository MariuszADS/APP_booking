import prisma from "../db/prismaClient.js";

export const getBooking = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getBooking;