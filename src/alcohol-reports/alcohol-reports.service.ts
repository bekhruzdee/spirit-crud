import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlcoholReport } from './entities/alcohol-report.entity';
import { CreateAlcoholReportDto } from './dto/create-alcohol-report.dto';
import { UpdateAlcoholReportDto } from './dto/update-alcohol-report.dto';
import { ProductTypesService } from '../product-types/product-types.service';

@Injectable()
export class AlcoholReportsService {
  constructor(
    @InjectRepository(AlcoholReport)
    private readonly reportRepo: Repository<AlcoholReport>,
    private readonly productTypesService: ProductTypesService,
  ) {}

  // ── CREATE ───────────────────────────────────────────────
  async create(dto: CreateAlcoholReportDto) {
    const trimmedTypeId = dto.productTypeId.trim();
    if (dto.productTypeId !== trimmedTypeId) {
      throw new BadRequestException(
        'ProductType ID contains leading or trailing spaces. Please remove them.',
      );
    }

    // UUID formatini tekshirish
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(trimmedTypeId)) {
      throw new BadRequestException(
        'Invalid UUID format. Please provide a valid ProductType ID',
      );
    }

    const productType = await this.productTypesService.findOne(trimmedTypeId);
    if (!productType) {
      throw new BadRequestException(
        `ProductType with id ${trimmedTypeId} not found`,
      );
    }

    const exists = await this.reportRepo.findOne({
      where: {
        productType: { id: productType.id },
        year: dto.year,
        month: dto.month,
      },
    });

    if (exists) {
      throw new ConflictException(
        'Report for this product type, year and month already exists',
      );
    }

    const isRawMaterial = [
      'Spirit',
      'Distillat',
      'Vinomaterial',
      'SemiFinished',
    ].includes(productType.code ?? '');

    const report = this.reportRepo.create({
      ...dto,
      productType,
      consumed_volume: isRawMaterial ? (dto.consumed_volume ?? 0) : null,
      consumed_abs: isRawMaterial ? (dto.consumed_abs ?? 0) : null,
    });

    report.closing_volume =
      (dto.opening_volume ?? 0) +
      (dto.received_volume ?? 0) +
      (dto.produced_volume ?? 0) -
      (dto.sold_volume ?? 0) -
      (dto.export_volume ?? 0) -
      (dto.loss_volume ?? 0) -
      (dto.own_use_volume ?? 0) -
      (report.consumed_volume ?? 0);

    report.closing_abs =
      (dto.opening_abs ?? 0) +
      (dto.received_abs ?? 0) +
      (dto.produced_abs ?? 0) -
      (dto.sold_abs ?? 0) -
      (dto.export_abs ?? 0) -
      (report.consumed_abs ?? 0);

    const savedReport = await this.reportRepo.save(report);

    return {
      message: 'Alcohol report created successfully',
      data: savedReport,
    };
  }

  // ── FIND ALL ─────────────────────────────────────────────
  async findAll() {
    const reports = await this.reportRepo.find({
      relations: ['productType'],
      order: { year: 'DESC', month: 'DESC' },
    });

    return {
      message: 'Alcohol reports retrieved successfully',
      data: reports,
    };
  }

  // ── FIND ONE ─────────────────────────────────────────────
  async findOne(id: string) {
    const trimmedId = id.trim();

    const report = await this.reportRepo.findOne({
      where: { id: trimmedId },
      relations: ['productType'],
    });

    if (!report) {
      throw new NotFoundException(
        `Alcohol report with id ${trimmedId} not found`,
      );
    }

    return {
      message: 'Alcohol report retrieved successfully',
      data: report,
    };
  }

  // ── UPDATE ───────────────────────────────────────────────
  async update(id: string, dto: UpdateAlcoholReportDto) {
    const trimmedId = id.trim();

    const report = await this.reportRepo.findOne({
      where: { id: trimmedId },
      relations: ['productType'],
    });

    if (!report) {
      throw new NotFoundException(
        `Alcohol report with id ${trimmedId} not found`,
      );
    }

    if (dto.productTypeId) {
      const trimmedTypeId = dto.productTypeId.trim();
      if (dto.productTypeId !== trimmedTypeId) {
        throw new BadRequestException(
          'ProductType ID contains leading or trailing spaces. Please remove them.',
        );
      }

      const productType = await this.productTypesService.findOne(trimmedTypeId);
      if (!productType) {
        throw new BadRequestException(
          `ProductType with id ${trimmedTypeId} not found`,
        );
      }
      report.productType = productType;
    }

    const isRawMaterial = [
      'Spirit',
      'Distillat',
      'Vinomaterial',
      'SemiFinished',
    ].includes(report.productType.code ?? '');

    report.consumed_volume = isRawMaterial ? (dto.consumed_volume ?? 0) : null;
    report.consumed_abs = isRawMaterial ? (dto.consumed_abs ?? 0) : null;

    Object.assign(report, dto);

    report.closing_volume =
      (report.opening_volume ?? 0) +
      (report.received_volume ?? 0) +
      (report.produced_volume ?? 0) -
      (report.sold_volume ?? 0) -
      (report.export_volume ?? 0) -
      (report.loss_volume ?? 0) -
      (report.own_use_volume ?? 0) -
      (report.consumed_volume ?? 0);

    report.closing_abs =
      (report.opening_abs ?? 0) +
      (report.received_abs ?? 0) +
      (report.produced_abs ?? 0) -
      (report.sold_abs ?? 0) -
      (report.export_abs ?? 0) -
      (report.consumed_abs ?? 0);

    const savedReport = await this.reportRepo.save(report);

    return {
      message: 'Alcohol report updated successfully',
      data: savedReport,
    };
  }

  // ── DELETE ───────────────────────────────────────────────
  async remove(id: string) {
    const trimmedId = id.trim();

    const result = await this.reportRepo.delete(trimmedId);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Alcohol report with id ${trimmedId} not found`,
      );
    }

    return {
      message: 'Alcohol report deleted successfully',
    };
  }
}
