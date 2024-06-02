import { Prisma } from '@prisma/client';
import { CreateCatInput } from './create-cat.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdateCatInput extends PartialType(CreateCatInput) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;
}

export const UpdateCatInputToModel = (updateCatInput: UpdateCatInput) => {
  const { trainers, breedId, ...data } = updateCatInput;

  const createCatModel: Prisma.CatUpdateInput = {
    ...data,
    ...(breedId && {
      breed: { connect: { id: breedId } },
    }),
    ...(trainers && {
      trainers: {
        set: trainers.map((id) => ({ id })),
      },
    }),
  };

  return createCatModel;
};
