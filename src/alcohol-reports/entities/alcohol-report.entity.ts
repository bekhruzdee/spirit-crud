import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('alcohol_reports')
export class AlcoholReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.reports, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column() year: number;
  @Column() month: number;

  @Column('decimal', { nullable: true })    
  year_start_volume: number;

  @Column('decimal', { nullable: true })
  year_start_abs: number;

  @Column('decimal', { nullable: true })
  produced_volume: number;

  @Column('decimal', { nullable: true })
  produced_abs: number;

  @Column('decimal', { nullable: true })
  sold_volume: number;

  @Column('decimal', { nullable: true })
  sold_abs: number;

  @Column('decimal', { nullable: true })
  sold_sum: number;

  @Column('decimal', { nullable: true })
  loss_volume: number;

  @Column('decimal', { nullable: true })
  month_end_volume: number;

  @Column('decimal', { nullable: true })
  month_end_abs: number;
}
