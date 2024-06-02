import { Module, forwardRef } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersResolver } from './trainers.resolver';
import { CatModule } from 'modules/cat/cat.module';

@Module({
  imports: [forwardRef(() => CatModule)],
  providers: [TrainersResolver, TrainersService],
  exports: [TrainersService],
})
export class TrainersModule {}
