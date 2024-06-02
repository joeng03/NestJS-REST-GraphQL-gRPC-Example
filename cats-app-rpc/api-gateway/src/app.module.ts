import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProtopaymentsModule } from './modules/protopayments/protopayments.module';

@Module({
  imports: [ProtopaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
