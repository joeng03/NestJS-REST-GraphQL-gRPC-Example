import { Test, TestingModule } from '@nestjs/testing';
import { ProtopaymentsController } from './protopayments.controller';

describe('ProtopaymentsController', () => {
  let controller: ProtopaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtopaymentsController],
    }).compile();

    controller = module.get<ProtopaymentsController>(ProtopaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
