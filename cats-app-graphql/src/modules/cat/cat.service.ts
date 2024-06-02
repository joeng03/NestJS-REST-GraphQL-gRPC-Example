import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCatInput, CreateCatInputToModel } from './dto/create-cat.input';
import { UpdateCatInput, UpdateCatInputToModel } from './dto/update-cat.input';

@Injectable()
export class CatService {
  constructor(private prismaService: PrismaService) {}

  async create(createCatInput: CreateCatInput) {
    return await this.prismaService.cat.create({
      data: CreateCatInputToModel(createCatInput),
    });
  }

  async findAll() {
    return await this.prismaService.cat.findMany({
      include: {
        breed: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.cat.findUnique({
      where: { id },
      include: { breed: true },
    });
  }

  async update(id: number, updateCatInput: UpdateCatInput) {
    return await this.prismaService.cat.update({
      where: { id },
      data: UpdateCatInputToModel(updateCatInput),
    });
  }

  async remove(id: number) {
    return await this.prismaService.cat.delete({ where: { id } });
  }

  async findManyByTrainerId(id: number) {
    return await this.prismaService.cat.findMany({
      where: { id },
      include: { breed: true },
    });
  }
}
