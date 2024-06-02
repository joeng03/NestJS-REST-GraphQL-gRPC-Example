import { Controller, OnModuleInit, Inject, Post, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentRequest, PaymentService } from 'proto/payment';

@Controller('payments')
export class ProtopaymentsController implements OnModuleInit {
  private paymentService: PaymentService;

  constructor(@Inject('PAYMENTPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.paymentService =
      this.client.getService<PaymentService>('PaymentService');
  }

  @Post()
  makePayment(@Body() paymentRequest: PaymentRequest) {
    return this.paymentService.makePayment(paymentRequest);
  }
}
