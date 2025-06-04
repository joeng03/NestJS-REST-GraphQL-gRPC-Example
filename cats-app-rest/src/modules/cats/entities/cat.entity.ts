import { Cat } from '@prisma/client';
import { BreedEntity } from './breed.entity';

export class CatEntity implements Omit<Cat, 'nickName'> {
  id: number;
  name: string;
  age: number;
  breedId: number;
  breed: BreedEntity;
  imageLink: string;
  createdAt: Date;
  updatedAt: Date;
}
