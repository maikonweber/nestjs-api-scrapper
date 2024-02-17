import { Test, TestingModule } from '@nestjs/testing';
import { FutbolService } from './futbol.service';

describe('FutbolService', () => {
  let service: FutbolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutbolService],
    }).compile();

    service = module.get<FutbolService>(FutbolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
