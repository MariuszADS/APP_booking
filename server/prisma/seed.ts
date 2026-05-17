import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {
      name: "Admin",
      role: "admin",
      password,
    },
    create: {
      email: "test@test.com",
      name: "Admin",
      role: "admin",
      password,
    },
  });

  const adam = await prisma.user.upsert({
    where: { email: "adam@gmail.com" },
    update: {
      name: "Adam",
      role: "user",
      password,
    },
    create: {
      email: "adam@gmail.com",
      name: "Adam",
      role: "user",
      password,
    },
  });

  await prisma.user.upsert({
    where: { email: "krzysiek@gmail.com" },
    update: {
      name: "Krzysztof",
      role: "user",
      password,
    },
    create: {
      email: "krzysiek@gmail.com",
      name: "Krzysztof",
      role: "user",
      password,
    },
  });

  const haircut = await prisma.service.upsert({
    where: { id: 1 },
    update: {
      name: "Men haircut",
      comment: "30 minutes",
    },
    create: {
      name: "Men haircut",
      comment: "30 minutes",
    },
  });

  const beard = await prisma.service.upsert({
    where: { id: 2 },
    update: {
      name: "Beard trimming",
      comment: "15 minutes",
    },
    create: {
      name: "Beard trimming",
      comment: "15 minutes",
    },
  });

  const combo = await prisma.service.upsert({
    where: { id: 3 },
    update: {
      name: "Hair + beard",
      comment: "45 minutes",
    },
    create: {
      name: "Hair + beard",
      comment: "45 minutes",
    },
  });

  await prisma.booking.upsert({
    where: { id: 1 },
    update: {
      date: new Date("2026-11-15T10:00:00Z"),
      comment: "I can be late around 5 min",
      userId: admin.id,
      serviceId: haircut.id,
    },
    create: {
      date: new Date("2026-11-15T10:00:00Z"),
      comment: "I can be late around 5 min",
      userId: admin.id,
      serviceId: haircut.id,
    },
  });

  await prisma.booking.upsert({
    where: { id: 2 },
    update: {
      date: new Date("2026-11-16T12:30:00Z"),
      comment: null,
      userId: adam.id,
      serviceId: beard.id,
    },
    create: {
      date: new Date("2026-11-16T12:30:00Z"),
      comment: null,
      userId: adam.id,
      serviceId: beard.id,
    },
  });

  await prisma.booking.upsert({
    where: { id: 3 },
    update: {
      date: new Date("2026-11-17T14:00:00Z"),
      comment: "Please be quick",
      userId: admin.id,
      serviceId: combo.id,
    },
    create: {
      date: new Date("2026-11-17T14:00:00Z"),
      comment: "Please be quick",
      userId: admin.id,
      serviceId: combo.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
