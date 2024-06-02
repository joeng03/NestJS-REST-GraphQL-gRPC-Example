import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Asynchronously seeds the database with cat data.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is finished.
 */
async function main() {
  type PrismaTable = {
    table_name: string;
  };

  const tables = await prisma.$queryRawUnsafe<PrismaTable[]>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
  );

  console.log(tables);

  for (const table of tables)
    await prisma.$queryRawUnsafe(
      `Truncate "${table.table_name}" restart identity cascade;`,
    );

  // Seed the breeds first
  const breedsData: Prisma.BreedCreateManyInput[] = [
    { name: 'British Shorthair' },
    { name: 'Maine Coon' },
    { name: 'Scottish Fold' },
    { name: 'Siamese' },
    { name: 'Sphynx' },
    { name: 'Persian' },
    { name: 'Norwegian Forest' },
  ];
  await prisma.breed.createMany({ data: breedsData });

  // Seed the trainers
  const trainerData = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'Bob Smith' },
    { name: 'Alice Johnson' },
    { name: 'Charlie Brown' },
    { name: 'Emily Davis' },
    { name: 'Michael Wilson' },
    { name: 'Olivia Taylor' },
    { name: 'Daniel Anderson' },
    { name: 'Sophia Anderson' },
    { name: 'Jacob Thompson' },
    { name: 'Emma Thompson' },
  ];

  await prisma.trainer.createMany({ data: trainerData });

  // Seed the cats
  const catData: Prisma.CatCreateInput[] = [
    {
      name: 'Maru',
      breed: { connect: { id: 1 } },
      age: 2,
      trainers: { connect: [{ id: 1 }, { id: 2 }] },
    },
    {
      name: 'Jim',
      breed: { connect: { id: 2 } },
      age: 5,
      trainers: { connect: [{ id: 1 }, { id: 2 }] },
    },
    {
      name: 'Henriette',
      breed: { connect: { id: 3 } },
      age: 1,
      trainers: { connect: [{ id: 3 }, { id: 4 }] },
    },
    {
      name: 'Coco',
      breed: { connect: { id: 3 } },
      age: 4,
      trainers: { connect: [{ id: 5 }, { id: 6 }] },
    },
    {
      name: 'Lucky',
      breed: { connect: { id: 4 } },
      age: 3,
      trainers: { connect: [{ id: 7 }, { id: 8 }] },
    },
    {
      name: 'Nala',
      breed: { connect: { id: 5 } },
      age: 2,
      trainers: { connect: [{ id: 9 }, { id: 10 }] },
    },
    {
      name: 'Meow Meow',
      breed: { connect: { id: 6 } },
      age: 1,
      trainers: { connect: [{ id: 11 }, { id: 12 }] },
    },
    {
      name: 'Putu',
      breed: { connect: { id: 6 } },
      age: 6,
      trainers: { connect: [{ id: 1 }, { id: 2 }] },
    },
    {
      name: 'Hana',
      breed: { connect: { id: 7 } },
      age: 5,
      trainers: { connect: [{ id: 3 }, { id: 4 }] },
    },
  ];

  await prisma.$transaction(
    catData.map((cat) => prisma.cat.create({ data: cat })),
  );

  console.log('Seeding finished.');
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
