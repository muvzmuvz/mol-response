import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operator } from './operator.entity';

@Injectable()
export class OperatorService {
  constructor(
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
  ) {}

  findAll(): Promise<Operator[]> {
    return this.operatorRepository.find();
  }

  findOne(id: number): Promise<Operator | null> {
    return this.operatorRepository.findOneBy({ id });
  }

  create(operatorData: Partial<Operator>): Promise<Operator> {
    const operator = this.operatorRepository.create(operatorData);
    return this.operatorRepository.save(operator);
  }

  async update(id: number, operatorData: Partial<Operator>): Promise<Operator> {
    await this.operatorRepository.update(id, operatorData);
    return this.findOne(id) as Promise<Operator>;
  }

  async remove(id: number): Promise<void> {
    await this.operatorRepository.delete(id);
  }
}
