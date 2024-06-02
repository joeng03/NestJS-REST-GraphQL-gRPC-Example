import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
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
  age: number;

  @ApiProperty({
    description: 'The breed of the cat',
    example: 1,
  })
  @IsInt()
  breedId: number;

  @ApiProperty({
    description: 'The image link of the cat',
    example:
      'https://s.yimg.com/ny/api/res/1.2/ujhbKBvPoRp72zKNdLrREg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://media.zenfs.com/en/insider_articles_922/c6ce8d0b9a7b28f9c2dee8171da98b8f',
  })
  @IsString()
  imageLink: string;
}
