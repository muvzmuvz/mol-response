import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { Operator } from './operator.entity';

@Controller('operators')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Get()
  getAll() {
    return this.operatorService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.operatorService.findOne(+id);
  }

  @Post()
  create(@Body() operatorData: Partial<Operator>) {
    return this.operatorService.create(operatorData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() operatorData: Partial<Operator>) {
    return this.operatorService.update(+id, operatorData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operatorService.remove(+id);
  }
}
