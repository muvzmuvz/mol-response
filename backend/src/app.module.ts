import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { RouteModule } from './route/route.module';
import { ClientModule } from './clients/client.module';
import { HistoryModule } from './history/history.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    RouteModule,
    ClientModule,
    HistoryModule,
    TasksModule,
  ],
})
export class AppModule {}
