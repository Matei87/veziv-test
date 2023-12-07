import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { IWork } from './interfaces/work.interface';

@Controller('api')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(): Promise<IWork[]> {
    return await this.workService.readAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IWork> {
    return await this.workService.readById(id);
  }

  @Post()
  async createWork(@Body() work: IWork): Promise<IWork> {
    return await this.workService.create(work);
  }

  @Put(':id')
  async updateWork(
    @Param('id')
    id: string,
    @Body()
    work: IWork,
  ): Promise<IWork> {
    return await this.workService.update(id, work);
  }

  @Delete(':id')
  async deleteWork(@Param('id') id: string) {
    return await this.workService.delete(id);
  }
}
