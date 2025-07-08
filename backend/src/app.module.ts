import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { RouteModule } from './route/route.module';
import { OperatorModule } from './operator/operator.module';
import { RequestModule } from './request/request.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // В проде лучше false, для простоты сейчас true
    }),
    RouteModule,
    OperatorModule,
    RequestModule,
    HistoryModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
