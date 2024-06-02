import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { TrainersModule } from 'modules/trainers/trainers.module';

@Module({
  imports: [TrainersModule],
  providers: [CatResolver, CatService],
  exports: [CatService],
})
export class CatModule {}
