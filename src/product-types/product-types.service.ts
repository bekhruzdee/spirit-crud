// src/product-types/product-types.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly repo: Repository<ProductType>,
  ) {}

  async create(dto: CreateProductTypeDto) {
    if (!dto.code || dto.code.trim() === '') {
      throw new BadRequestException('Product type "code" is required');
    }
    const codeTrimmed = dto.code.trim();
    if (codeTrimmed.length > 50) {
      throw new BadRequestException(
        'Product type "code" must not exceed 50 characters',
      );
    }

    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Product type "name" is required');
    }
    const nameTrimmed = dto.name.trim();
    if (nameTrimmed.length > 100) {
      throw new BadRequestException(
        'Product type "name" must not exceed 100 characters',
      );
    }

    const exists = await this.repo.findOne({ where: { code: codeTrimmed } });
    if (exists) {
      throw new ConflictException(
        `Product type with code "${codeTrimmed}" already exists`,
      );
    }

    const productType = this.repo.create({
      code: codeTrimmed,
      name: nameTrimmed,
    });
    const saved = await this.repo.save(productType);

    return {
      message: 'Product type created successfully',
      data: saved,
    };
  }

  async findAll() {
    const types = await this.repo.find({ order: { createdAt: 'DESC' } });
    return {
      message: 'Product types retrieved successfully',
      data: types,
    };
  }

  async findOne(id: string) {
    const type = await this.repo.findOne({ where: { id } });
    if (!type)
      throw new NotFoundException(`Product type with id "${id}" not found`);
    return type;
  }

  async update(id: string, dto: UpdateProductTypeDto) {
    const type = await this.findOne(id);

    if (dto.code) {
      const codeTrimmed = dto.code.trim();
      if (codeTrimmed === '') {
        throw new BadRequestException('Product type "code" cannot be empty');
      }
      if (codeTrimmed.length > 50) {
        throw new BadRequestException(
          'Product type "code" must not exceed 50 characters',
        );
      }

      if (codeTrimmed !== type.code) {
        const exists = await this.repo.findOne({
          where: { code: codeTrimmed },
        });
        if (exists)
          throw new ConflictException(
            `Product type "${codeTrimmed}" already exists`,
          );
      }

      type.code = codeTrimmed;
    }

    if (dto.name) {
      const nameTrimmed = dto.name.trim();
      if (nameTrimmed === '') {
        throw new BadRequestException('Product type "name" cannot be empty');
      }
      if (nameTrimmed.length > 100) {
        throw new BadRequestException(
          'Product type "name" must not exceed 100 characters',
        );
      }

      type.name = nameTrimmed;
    }

    const saved = await this.repo.save(type);

    return {
      message: 'Product type updated successfully',
      data: saved,
    };
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Product type with id "${id}" not found`);
    return { message: 'Product type deleted successfully' };
  }
}
