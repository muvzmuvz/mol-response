import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { HistoryService } from './history.service';
import { RequestHistory } from './request-history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Post()
  create(@Body() historyData: Partial<RequestHistory>) {
    return this.historyService.create(historyData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
