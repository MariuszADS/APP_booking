import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {

    await prisma.user.createMany({
        data: [
            { email: "adam@gmail.com", name: "Adam" },
            { email: "krzysiek@gmail.com", name: "Krzysztof" }
        ],
        skipDuplicates:true
    })

    await prisma.service.createMany({
        data: [
            { name: "Hair cut", comment: "30min"}
            
        ],
        skipDuplicates:true
    })

    await prisma.booking.createMany({
        data:
            [
                {
                    date: new Date(),
                    comment: "i can be late around 5min",
                    userId:1,
                    serviceId:1
                },
                
            ],
            skipDuplicates:true
    })
}

main()

    .then(async () => {
        await prisma.$disconnect();

    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();

    });