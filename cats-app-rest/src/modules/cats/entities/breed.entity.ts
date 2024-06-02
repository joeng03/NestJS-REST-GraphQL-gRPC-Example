import { Breed } from '@prisma/client';
export class BreedEntity implements Breed {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}
