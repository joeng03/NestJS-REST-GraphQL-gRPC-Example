import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async create(createCatDto: CreateCatDto) {
    return this.prisma.cat.create({
      data: createCatDto,
      // include: {
      //   breed: true,
      // },
    });
  }

  findAll() {
    return this.prisma.cat.findMany();
  }

  findOne(id: number) {
    return this.prisma.cat.findUnique({ where: { id } });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return this.prisma.cat.update({ where: { id }, data: updateCatDto });
  }

  remove(id: number) {
    return this.prisma.cat.delete({ where: { id } });
  }
}
