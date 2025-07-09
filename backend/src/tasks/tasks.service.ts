import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ClientService } from '../clients/client.service';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TasksService {
    constructor(
        private cs: ClientService,
        private hs: HistoryService,
    ) { }

    @Cron('0 0 * * *') // Выполняется каждый день в полночь
    async resetStatuses() {
        try {
            const clients = await this.cs.findAll();

            for (const client of clients) {
                if (client.status !== 'В процессе') {
                    // Записываем в историю
                    await this.hs.record(client);

                    // Обновляем статус через новый метод update
                    await this.cs.update(client.id, {
                        status: 'В процессе'
                    });
                }
            }

            console.log('Statuses reset at', new Date().toISOString());
        } catch (error) {
            console.error('Error resetting statuses:', error);
        }
    }
}