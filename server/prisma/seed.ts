import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {

    await prisma.user.createMany({
        data: [
            { email: "adam@gmail.com", name: "Adam" },
            { email: "krzysiek@gmail.com", name: "Krzysztof" }
        ]
    })

    await prisma.service.createMany({
        data: [
            { type_service: "Hair cut", comment: "30min" },
            { type_service: "Beard cut" }
        ]
    })

    await prisma.booking.create({
        data:
            { booked_date: "24.11.2026", appoitment_date: "26.11.2026", comment: "i can be late around 5min" }

    })
}

main()

    .then()
    .then(async () => {
        await prisma.$disconnect();

    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();

    });