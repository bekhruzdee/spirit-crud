import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlcoholReport } from '../../alcohol-reports/entities/alcohol-report.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AlcoholReport, (report) => report.product)
  alcoholReports: AlcoholReport[];

  @Column({ nullable: true })
  type: 'Spirit' | 'Distillat' | 'Vinomaterial' | 'SemiFinished' | 'Aroq';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
