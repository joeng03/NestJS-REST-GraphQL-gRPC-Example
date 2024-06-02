import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TrainersService } from './trainers.service';
import { TrainerEntity } from './entities/trainer.entity';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { CatService } from 'modules/cat/cat.service';
import { CatEntity } from 'modules/cat/entities/cat.entity';

@Resolver(() => TrainerEntity)
export class TrainersResolver {
  constructor(
    private readonly trainersService: TrainersService,
    private readonly catsService: CatService,
  ) {}

  @Mutation(() => TrainerEntity)
  createTrainer(
    @Args('createTrainerInput') createTrainerInput: CreateTrainerInput,
  ) {
    return this.trainersService.create(createTrainerInput);
  }

  @Query(() => [TrainerEntity], { name: 'listTrainers' })
  findAll() {
    return this.trainersService.findAll();
  }

  @Query(() => TrainerEntity, { name: 'trainer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.trainersService.findOne(id);
  }

  @Mutation(() => TrainerEntity)
  updateTrainer(
    @Args('updateTrainerInput') updateTrainerInput: UpdateTrainerInput,
  ) {
    return this.trainersService.update(
      updateTrainerInput.id,
      updateTrainerInput,
    );
  }

  @Mutation(() => TrainerEntity)
  removeTrainer(@Args('id', { type: () => Int }) id: number) {
    return this.trainersService.remove(id);
  }

  @ResolveField(() => [CatEntity])
  cats(@Parent() trainer: TrainerEntity) {
    return this.catsService.findManyByTrainerId(trainer.id);
  }
}
