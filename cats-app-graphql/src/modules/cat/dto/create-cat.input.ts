import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCatInput {
  @ApiProperty({
    description: 'The name of the cat',
    example: 'Fluffy',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 1,
  })
  @IsInt()
  @Field(() => Int)
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 1,
  })
  @IsInt()
  @Field(() => Int)
  breedId: number;

  @ApiProperty({
    description: 'The image link of the cat',
    example:
      'https://s.yimg.com/ny/api/res/1.2/ujhbKBvPoRp72zKNdLrREg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://media.zenfs.com/en/insider_articles_922/c6ce8d0b9a7b28f9c2dee8171da98b8f',
  })
  @IsString()
  @IsOptional()
  imageLink?: string;

  @ApiProperty({
    description: 'Ids of trainers',
    example: [1, 4, 33],
  })
  @IsInt({ each: true })
  trainers: number[];
}

export const CreateCatInputToModel = (createCatInput: CreateCatInput) => {
  const { trainers, breedId, ...data } = createCatInput;

  const createCatModel: Prisma.CatCreateInput = {
    ...data,
    breed: {
      connect: { id: breedId },
    },
    trainers: {
      connect: trainers.map((id) => ({ id })),
    },
  };

  return createCatModel;
};
