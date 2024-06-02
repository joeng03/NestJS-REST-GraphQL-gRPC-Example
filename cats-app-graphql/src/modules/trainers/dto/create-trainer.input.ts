import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
@InputType()
export class CreateTrainerInput {
  @Field(() => String)
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  nickname?: string;
}
