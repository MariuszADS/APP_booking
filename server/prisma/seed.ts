import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // USERS
  await prisma.user.createMany({
    data: [
      {
        email:"test@test.com",
        name:"test",
        role:"admin",
        password:"123"
      },
      {
        email: "adam@gmail.com",
        name: "Adam",
        role: "user",
        password:"321"
      },
      {
        email: "krzysiek@gmail.com",
        name: "Krzysztof",
        role: "user",
        password:"321"
      },
    ],
    skipDuplicates: true,
  });

  // SERVICES
  await prisma.service.createMany({
    data: [
      {
        name: "Men haircut",
        comment: "30 minutes",
      },
      {
        name: "Beard trimming",
        comment: "15 minutes",
      },
      {
        name: "Hair + beard",
        comment: "45 minutes",
      },
    ],
    skipDuplicates: true,
  });

  // BOOKINGS
  await prisma.booking.createMany({
    data: [
      {
        date: new Date("2026-11-15T10:00:00Z"),
        comment: "I can be late around 5 min",
        userId: 1,
        serviceId: 1,
      },
      {
        date: new Date("2026-11-16T12:30:00Z"),
        comment: null,
        userId: 2,
        serviceId: 2,
      },
      {
        date: new Date("2026-11-17T14:00:00Z"),
        comment: "Please be quick",
        userId: 1,
        serviceId: 3,
      },
    ],
    skipDuplicates: true,
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });