import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Operator } from '../operator/operator.entity';
import { Request } from '../request/request.entity';

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Operator, operator => operator.route)
    operators: Operator[];

    @OneToMany(() => Request, request => request.route)
    requests: Request[];
}
