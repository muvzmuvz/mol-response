import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RequestService } from './request.service';
import { Request } from './request.entity';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  getAll() {
    return this.requestService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Post()
  create(@Body() requestData: Partial<Request>) {
    return this.requestService.create(requestData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() requestData: Partial<Request>) {
    return this.requestService.update(+id, requestData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
