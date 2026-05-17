import prisma from "../db/prismaClient.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                bookings: {
                    include: {
                        service: true
                    },
                    orderBy: {
                        date: "asc"
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        });

        res.json(users);
    } catch (error) {
        next(error);
    }
};
