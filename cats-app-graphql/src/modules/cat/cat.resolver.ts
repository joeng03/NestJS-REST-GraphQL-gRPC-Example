import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CatService } from './cat.service';
import { CatEntity } from './entities/cat.entity';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { TrainersService } from 'modules/trainers/trainers.service';
import { TrainerEntity } from 'modules/trainers/entities/trainer.entity';

@Resolver(() => CatEntity)
export class CatResolver {
  constructor(
    private readonly catService: CatService,
    private readonly trainersService: TrainersService,
  ) {}

  @Mutation(() => CatEntity, { name: 'cat' })
  create(@Args('createCatInput') createCatInput: CreateCatInput) {
    return this.catService.create(createCatInput);
  }

  @Query(() => [CatEntity], { name: 'cats' })
  findAll() {
    return this.catService.findAll();
  }

  @Query(() => CatEntity, { name: 'readCat' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const test = await this.catService.findOne(id);
    console.log(test);
    return test;
  }

  @Mutation(() => CatEntity, { name: 'updateCat' })
  update(@Args('updateCatInput') updateCatInput: UpdateCatInput) {
    return this.catService.update(updateCatInput.id, updateCatInput);
  }

  @Mutation(() => CatEntity, { name: 'deleteCat' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.catService.remove(id);
  }

  @ResolveField(() => [TrainerEntity])
  trainers(@Parent() cat: CatEntity) {
    return this.trainersService.findManyByCatId(cat.id);
  }
}
