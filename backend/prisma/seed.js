import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.studio.deleteMany();
  const user1 = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      password: "test",
      role: "user",
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "testadmin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password: "admin",
      role: "admin",
    },
  });
  const studios = [
    { name: "Sala A", price: 100 },
    { name: "Sala B", price: 100 },
    { name: "Sala C", price: 150 },
    { name: "Studio A", price: 200 },
    { name: "Studio B", price: 250 },
  ];
  for (const studio of studios) {
    await prisma.studio.upsert({
      where: { name: studio.name },
      update: {},
      create: {
        ...studio,
        imageUrl: "https://example.com/studio.jpg",
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
