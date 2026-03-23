import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma; 

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");
    } catch (error) {
        console.log(`Database connection error ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("Database has been disconnected");
};