import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Asynchronously seeds the database with cat data.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is finished.
 */
async function main() {
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

  // Seed the cats
  const data: Prisma.CatCreateManyInput[] = [
    { name: 'Maru', breedId: 1, age: 2 },
    { name: 'Jim', breedId: 2, age: 5 },
    { name: 'Henriette', breedId: 3, age: 1 },
    { name: 'Coco', breedId: 3, age: 4 },
    { name: 'Lucky', breedId: 4, age: 3 },
    { name: 'Nala', breedId: 5, age: 2 },
    { name: 'Meow Meow', breedId: 6, age: 1 },
    { name: 'Putu', breedId: 6, age: 6 },
    { name: 'Hana', breedId: 7, age: 5 },
  ];
  await prisma.cat.createMany({ data });

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
