import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Route } from '../route/route.entity';
import { RequestHistory } from '../history/request-history.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  status: 'В процессе' | 'Выполнено' | 'Не выполнено';

  @ManyToOne(() => Route, route => route.requests, { onDelete: 'SET NULL' })
  route: Route;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RequestHistory, history => history.request)
  histories: RequestHistory[];
}
