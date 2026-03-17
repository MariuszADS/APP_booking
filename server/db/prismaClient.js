//imported client from node.js
import { PrismaClient } from "@prisma/client";

//generated client
const prisma = new PrismaClient()

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("DB connected via Prisma");
    }
    catch (error) {
        console.log(`Database connection error ${error.message}`);
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.disconnectDB()
    console.log("Database has been disconected");
}

export default { prisma, connectDB, disconnectDB }

// file in use by client