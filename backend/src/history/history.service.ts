import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestHistory } from './request-history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(RequestHistory)
    private readonly historyRepository: Repository<RequestHistory>,
  ) {}

  findAll(): Promise<RequestHistory[]> {
    return this.historyRepository.find({ relations: ['request'] });
  }

  findOne(id: number): Promise<RequestHistory | null> {
    return this.historyRepository.findOne({
      where: { id },
      relations: ['request'],
    });
  }

  create(historyData: Partial<RequestHistory>): Promise<RequestHistory> {
    const history = this.historyRepository.create(historyData);
    return this.historyRepository.save(history);
  }

  async remove(id: number): Promise<void> {
    await this.historyRepository.delete(id);
  }
}
