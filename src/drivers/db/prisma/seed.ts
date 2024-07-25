/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.location.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();
}

async function seedDatabase() {
  await prisma.user.createMany({
    data: [],
  });
}

async function main() {
  await clearDatabase();
  await seedDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
