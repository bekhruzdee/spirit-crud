import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlcoholReportsService } from './alcohol-reports.service';
import { AlcoholReportsController } from './alcohol-reports.controller';
import { ProductsModule } from '../products/products.module';
import { AlcoholReport } from './entities/alcohol-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlcoholReport]), ProductsModule],
  controllers: [AlcoholReportsController],
  providers: [AlcoholReportsService],
})
export class AlcoholReportsModule {}
