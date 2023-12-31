import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSchema } from './schemas/work.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Work', schema: WorkSchema }])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
