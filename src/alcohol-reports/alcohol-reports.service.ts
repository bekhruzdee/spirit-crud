import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlcoholReport } from './entities/alcohol-report.entity';
import { CreateAlcoholReportDto } from './dto/create-alcohol-report.dto';
import { UpdateAlcoholReportDto } from './dto/update-alcohol-report.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AlcoholReportsService {
  constructor(
    @InjectRepository(AlcoholReport)
    private reportRepo: Repository<AlcoholReport>,
    private productsService: ProductsService,
  ) {}

  async create(dto: CreateAlcoholReportDto) {
    const product = await this.productsService.findOne(dto.productId);
    if (!product)
      throw new BadRequestException(
        `Product with id ${dto.productId} not found`,
      );

    const report = this.reportRepo.create({ ...dto, product });
    return this.reportRepo.save(report);
  }

  async findAll() {
    const reports = await this.reportRepo.find({ relations: ['product'] });
    return { message: 'Alcohol reports retrieved successfully', data: reports };
  }

  async findOne(id: string) {
    const report = await this.reportRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!report)
      throw new NotFoundException(`Alcohol report with id ${id} not found`);
    return { message: 'Alcohol report retrieved successfully', data: report };
  }

  async update(id: string, dto: UpdateAlcoholReportDto) {
    const report = await this.reportRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!report)
      throw new NotFoundException(`Alcohol report with id ${id} not found`);

    if (dto.productId) {
      const product = await this.productsService.findOne(dto.productId);
      if (!product)
        throw new BadRequestException(
          `Product with id ${dto.productId} not found`,
        );
      report.product = product;
    }

    Object.assign(report, dto);
    const updated = await this.reportRepo.save(report);
    return { message: 'Alcohol report updated successfully', data: updated };
  }

  async remove(id: string) {
    const result = await this.reportRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Alcohol report with id ${id} not found`);
    return { message: 'Alcohol report deleted successfully' };
  }
}
