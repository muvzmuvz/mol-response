import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './route.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  findAll(): Promise<Route[]> {
    return this.routeRepository.find();
  }

  findOne(id: number): Promise<Route | null> {
    return this.routeRepository.findOneBy({ id });
  }

  create(name: string): Promise<Route> {
    const route = this.routeRepository.create({ name });
    return this.routeRepository.save(route);
  }

  async update(id: number, name: string): Promise<Route | null> {
    const route = await this.findOne(id);
    if (!route) return null;
    route.name = name;
    return this.routeRepository.save(route);
  }

  async remove(id: number): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
