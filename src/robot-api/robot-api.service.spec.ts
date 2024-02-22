import { Test, TestingModule } from '@nestjs/testing';
import { RobotApiService } from './robot-api.service';

describe('RobotApiService', () => {
  let service: RobotApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RobotApiService],
    }).compile();

    service = module.get<RobotApiService>(RobotApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
