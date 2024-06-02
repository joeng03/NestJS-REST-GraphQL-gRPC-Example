import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Trainer } from '@prisma/client';
import { CatEntity } from 'modules/cat/entities/cat.entity';

@ObjectType()
export class TrainerEntity implements Partial<Trainer> {
  @Field(() => Int)
  id: number;
  name: string;
  nickname?: string;
  cats?: CatEntity[];

  createdAt: Date;
  updatedAt: Date;
}
