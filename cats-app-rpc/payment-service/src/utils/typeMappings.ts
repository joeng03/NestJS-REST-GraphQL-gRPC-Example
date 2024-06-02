import { Currency as ProtoCurrency } from 'proto/payment';
import { $Enums } from '@prisma/client';

type PrismaCurrency = $Enums.Currency;

export const protoToPrismaCurrencyMap: Record<ProtoCurrency, PrismaCurrency> = {
  [ProtoCurrency.SGD]: 'SGD',
  [ProtoCurrency.USD]: 'USD',
  [ProtoCurrency.EUR]: 'EUR',
  [ProtoCurrency.JPY]: 'JPY',
  [ProtoCurrency.GBP]: 'GBP',
  [ProtoCurrency.CNY]: 'CNY',
  [ProtoCurrency.MYR]: 'MYR',
  [ProtoCurrency.UNRECOGNIZED]: 'UNRECOGNIZED',
};

export const prismaToProtoCurrencyMap: Record<PrismaCurrency, ProtoCurrency> = {
  SGD: ProtoCurrency.SGD,
  USD: ProtoCurrency.USD,
  EUR: ProtoCurrency.EUR,
  JPY: ProtoCurrency.JPY,
  GBP: ProtoCurrency.GBP,
  CNY: ProtoCurrency.CNY,
  MYR: ProtoCurrency.MYR,
  UNRECOGNIZED: ProtoCurrency.UNRECOGNIZED,
};
