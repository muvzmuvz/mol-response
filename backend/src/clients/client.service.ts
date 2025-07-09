import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteService } from '../route/route.service';
import { HistoryService } from '../history/history.service';
import { History } from '../history/history.entity';


interface CreateClientDto {
    routeTitle: string;
    organization: string;
    name: string;
    phone: string;
    email: string;
    status: string;
}

interface UpdateClientDto {
    routeTitle?: string;
    organization?: string;
    name?: string;
    phone?: string;
    email?: string;
    status?: string;
}

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private repo: Repository<Client>,
        private routeService: RouteService,
        private historyService: HistoryService
    ) { }

    async create(dto: CreateClientDto) {
        if (!dto.routeTitle) {
            throw new BadRequestException('routeTitle is required');
        }

        const route = await this.routeService.findOrCreate(dto.routeTitle);
        if (!route) {
            throw new NotFoundException('Route could not be created or found');
        }

        const client = this.repo.create({
            organization: dto.organization,
            name: dto.name,
            phone: dto.phone,
            email: dto.email,
            status: dto.status,
            route,  // обязательно передаём объект маршрута
        });

        const savedClient = await this.repo.save(client);

        return this.repo.findOne({
            where: { id: savedClient.id },
            relations: ['route']
        });
    }

    findAll() {
        return this.repo.find({
            order: { createdAt: 'DESC' },
            relations: ['route'],
        });
    }

    async update(id: number, dto: UpdateClientDto) {
        // Находим клиента по id с загрузкой маршрута
        const client = await this.repo.findOne({
            where: { id },
            relations: ['route'],
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        // Если пришёл новый маршрут — ищем или создаём его
        if (dto.routeTitle) {
            const route = await this.routeService.findOrCreate(dto.routeTitle);
            client.route = route;
        }

        // Обновляем поля клиента, если они указаны в dto
        client.organization = dto.organization ?? client.organization;
        client.name = dto.name ?? client.name;
        client.phone = dto.phone ?? client.phone;
        client.email = dto.email ?? client.email;
        client.status = dto.status ?? client.status;

        // Сохраняем обновлённого клиента в базе
        await this.repo.save(client);

        // --- ВАЖНО: сохраняем текущие данные клиента в историю ---
        await this.historyService.record(client);

        // Возвращаем обновлённого клиента с маршрутом
        return this.repo.findOne({
            where: { id },
            relations: ['route'],
        });
    }

    async remove(id: number) {
        const client = await this.repo.findOne({ where: { id } });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        // Удаляем историю, связанную с клиентом
        await this.historyService.deleteByClientId(id);

        // Удаляем клиента
        await this.repo.remove(client);

        return { message: `Client with id ${id} has been deleted` };
    }


    async findAllWithHistory() {
        const clients = await this.repo.find({
            relations: ['route'],
            order: { createdAt: 'DESC' },
        });

        const result: Array<Client & { history: History[] }> = [];

        for (const client of clients) {
            const history = await this.historyService.findByClientId(client.id);
            result.push({
                ...client,
                history,
            });
        }

        return result;
    }

}
