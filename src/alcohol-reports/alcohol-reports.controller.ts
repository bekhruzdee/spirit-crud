import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlcoholReportsService } from './alcohol-reports.service';
import { CreateAlcoholReportDto } from './dto/create-alcohol-report.dto';
import { UpdateAlcoholReportDto } from './dto/update-alcohol-report.dto';

@Controller('alcohol-reports')
export class AlcoholReportsController {
  constructor(private readonly service: AlcoholReportsService) {}

  @Post()
  create(@Body() dto: CreateAlcoholReportDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlcoholReportDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}