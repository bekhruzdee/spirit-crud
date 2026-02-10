import { PartialType } from '@nestjs/mapped-types';
import { CreateAlcoholReportDto } from './create-alcohol-report.dto';

export class UpdateAlcoholReportDto extends PartialType(
  CreateAlcoholReportDto,
) {}
