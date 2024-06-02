import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'paymentproto',
        protoPath: 'proto/payment.proto',
        url: '0.0.0.0:50052',
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, stopAtFirstError: true }),
  );

  await app.listen();
}
bootstrap();
