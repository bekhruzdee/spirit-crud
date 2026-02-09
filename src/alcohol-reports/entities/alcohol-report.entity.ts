import { ProductType } from 'src/product-types/entities/product-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('alcohol_reports')
@Unique(['productType', 'year', 'month'])
export class AlcoholReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductType, { eager: true })
  @JoinColumn({ name: 'product_type_id' })
  productType: ProductType;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column('decimal', { nullable: true })
  opening_volume?: number;

  @Column('decimal', { nullable: true })
  opening_abs?: number;

  @Column('decimal', { nullable: true })
  received_volume?: number;

  @Column('decimal', { nullable: true })
  received_abs?: number;

  @Column('decimal', { nullable: true })
  consumed_volume?: number | null;

  @Column('decimal', { nullable: true })
  consumed_abs?: number | null;

  @Column('decimal', { nullable: true })
  produced_volume?: number;

  @Column('decimal', { nullable: true })
  produced_abs?: number;

  @Column('decimal', { nullable: true })
  sold_volume?: number;

  @Column('decimal', { nullable: true })
  sold_abs?: number;

  @Column('decimal', { nullable: true })
  sold_sum?: number;

  @Column('decimal', { nullable: true })
  export_volume?: number;

  @Column('decimal', { nullable: true })
  export_abs?: number;

  @Column('decimal', { nullable: true })
  export_sum?: number;

  @Column('decimal', { nullable: true })
  loss_volume?: number;

  @Column('decimal', { nullable: true })
  own_use_volume?: number;

  @Column('decimal', { nullable: true })
  closing_volume?: number;

  @Column('decimal', { nullable: true })
  closing_abs?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
