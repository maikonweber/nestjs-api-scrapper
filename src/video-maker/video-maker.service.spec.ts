import { Test, TestingModule } from '@nestjs/testing';
import { VideoMakerService } from './video-maker.service';

describe('VideoMakerService', () => {
  let service: VideoMakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoMakerService],
    }).compile();

    service = module.get<VideoMakerService>(VideoMakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
