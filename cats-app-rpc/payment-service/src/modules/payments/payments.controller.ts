import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentRequest } from 'proto/payment';
import { PaymentsService } from './payments.service';

@Controller('protopayments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}
  @GrpcMethod('PaymentService', 'makePayment')
  makePayment(paymentRequest: PaymentRequest) {
    return this.paymentService.makePayment(paymentRequest);
  }
}
