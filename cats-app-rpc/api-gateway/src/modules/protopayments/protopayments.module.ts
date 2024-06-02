import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProtopaymentsController } from './protopayments.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENTPROTO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: 'paymentproto',
          protoPath: 'proto/payment.proto',
        },
      },
    ]),
  ],
  controllers: [ProtopaymentsController],
})
export class ProtopaymentsModule {}
