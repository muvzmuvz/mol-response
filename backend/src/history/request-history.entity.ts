import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Request } from '../request/request.entity';

@Entity()
export class RequestHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Request, request => request.histories, { onDelete: 'CASCADE' })
  request: Request;

  @Column()
  status: 'В процессе' | 'Выполнено' | 'Не выполнено';

  @CreateDateColumn()
  date: Date;
}
