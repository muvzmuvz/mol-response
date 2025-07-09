import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity';
import { Repository } from 'typeorm';
import { Client } from '../clients/client.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private repo: Repository<History>,
  ) {}

  record(client: Client) {
    const h = this.repo.create({
      client,
      status: client.status,
      date: new Date().toISOString().slice(0, 10),
    });
    return this.repo.save(h);
  }
}
