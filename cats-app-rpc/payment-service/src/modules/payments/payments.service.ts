import { Injectable } from '@nestjs/common';
import { PaymentRequest, PaymentResponse } from 'proto/payment';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  prismaToProtoCurrencyMap,
  protoToPrismaCurrencyMap,
} from 'src/utils/typeMappings';
@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async makePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    const payment = await this.prisma.payment.create({
      data: {
        customerId: paymentRequest.customerId,
        catId: paymentRequest.catId,
        amount: paymentRequest.amount,
        currency: protoToPrismaCurrencyMap[paymentRequest.currency],
      },
      include: {
        customer: true,
        cat: true,
      },
    });
    return {
      ...payment,
      currency: prismaToProtoCurrencyMap[payment.currency],
    };
  }
}
