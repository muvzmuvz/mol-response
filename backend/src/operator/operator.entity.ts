import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Route } from '../route/route.entity';

@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Route, route => route.operators, { onDelete: 'CASCADE' })
  route: Route;
}
