import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Breed } from '@prisma/client';

@ObjectType()
export class BreedEntity implements Breed {
  @Field(() => Int)
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
