import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { TrainerEntity } from './entities/trainer.entity';

@Injectable()
export class TrainersService {
  constructor(private prisma: PrismaService) {}

  async create(createTrainerInput: CreateTrainerInput): Promise<TrainerEntity> {
    return this.prisma.trainer.create({ data: createTrainerInput });
  }

  async findAll(): Promise<TrainerEntity[]> {
    return this.prisma.trainer.findMany();
  }

  async findManyByCatId(id: number) {
    return this.prisma.trainer.findMany({
      where: { cats: { some: { id } } },
    });
  }

  async findOne(id: number): Promise<TrainerEntity> {
    return this.prisma.trainer.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateTrainerInput: UpdateTrainerInput,
  ): Promise<TrainerEntity> {
    return this.prisma.trainer.update({
      where: { id },
      data: updateTrainerInput,
    });
  }

  async remove(id: number): Promise<TrainerEntity> {
    return this.prisma.trainer.delete({ where: { id } });
  }
}
