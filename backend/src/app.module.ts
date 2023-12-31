import { Module } from '@nestjs/common';
import { WorkModule } from './work/work.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    WorkModule,
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/veziv`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
