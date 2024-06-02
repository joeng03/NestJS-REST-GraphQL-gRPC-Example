import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cat } from '@prisma/client';
import { BreedEntity } from './breed.entity';
import { TrainerEntity } from 'modules/trainers/entities/trainer.entity';

@ObjectType()
export class CatEntity implements Cat {
  @Field(() => Int)
  id: number;
  name: string;
  age: number;
  breedId: number;
  breed: BreedEntity;
  trainers: TrainerEntity[];
  imageLink: string;
  createdAt: Date;
  updatedAt: Date;
}
