import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const exists = await this.productRepo.findOne({
      where: { name: dto.name },
    });

    if (exists) {
      throw new ConflictException(
        `Product with name "${dto.name}" already exists`,
      );
    }

    const product = this.productRepo.create(dto);

    return {
      message: 'Product created successfully',
      data: await this.productRepo.save(product),
    };
  }

  async findAll() {
    const products = await this.productRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (dto.name && dto.name !== product.name) {
      const exists = await this.productRepo.findOne({
        where: { name: dto.name },
      });

      if (exists) {
        throw new ConflictException(
          `Product with name "${dto.name}" already exists`,
        );
      }
    }

    Object.assign(product, dto);

    return {
      message: 'Product updated successfully',
      data: await this.productRepo.save(product),
    };
  }

  async remove(id: string) {
    const result = await this.productRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      message: 'Product deleted successfully',
    };
  }
}
