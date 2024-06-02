import { Test, TestingModule } from '@nestjs/testing';
import { TrainersResolver } from './trainers.resolver';
import { TrainersService } from './trainers.service';

describe('TrainersResolver', () => {
  let resolver: TrainersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainersResolver, TrainersService],
    }).compile();

    resolver = module.get<TrainersResolver>(TrainersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
