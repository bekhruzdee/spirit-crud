import { Test, TestingModule } from '@nestjs/testing';
import { AlcoholReportsService } from './alcohol-reports.service';

describe('AlcoholReportsService', () => {
  let service: AlcoholReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlcoholReportsService],
    }).compile();

    service = module.get<AlcoholReportsService>(AlcoholReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
