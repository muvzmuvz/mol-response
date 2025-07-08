import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  findAll(): Promise<Request[]> {
    return this.requestRepository.find({ relations: ['operator'] });
  }

  findOne(id: number): Promise<Request | null> {
    return this.requestRepository.findOne({
      where: { id },
      relations: ['operator'],
    });
  }

  create(requestData: Partial<Request>): Promise<Request> {
    const request = this.requestRepository.create(requestData);
    return this.requestRepository.save(request);
  }

  async update(id: number, requestData: Partial<Request>): Promise<Request> {
    await this.requestRepository.update(id, requestData);
    return this.findOne(id) as Promise<Request>;
  }

  async remove(id: number): Promise<void> {
    await this.requestRepository.delete(id);
  }
}
