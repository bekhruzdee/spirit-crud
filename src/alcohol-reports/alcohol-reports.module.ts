import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlcoholReportsService } from './alcohol-reports.service';
import { AlcoholReportsController } from './alcohol-reports.controller';
import { AlcoholReport } from './entities/alcohol-report.entity';
import { ProductTypesModule } from 'src/product-types/product-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlcoholReport]), ProductTypesModule],
  controllers: [AlcoholReportsController],
  providers: [AlcoholReportsService],
})
export class AlcoholReportsModule {}
