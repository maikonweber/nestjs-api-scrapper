import { Test, TestingModule } from '@nestjs/testing';
import { FutbolController } from './futbol.controller';
import { FutbolService } from './futbol.service';

describe('FutbolController', () => {
  let controller: FutbolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FutbolController],
      providers: [FutbolService],
    }).compile();

    controller = module.get<FutbolController>(FutbolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
