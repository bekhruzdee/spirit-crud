import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlcoholReport } from '../../alcohol-reports/entities/alcohol-report.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AlcoholReport, report => report.product)
  reports: AlcoholReport[];
}