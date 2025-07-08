import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Operator } from './operator.entity';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Operator])],
  providers: [OperatorService],
  controllers: [OperatorController],
  exports: [OperatorService],
})
export class OperatorModule {}
