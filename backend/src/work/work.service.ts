import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IWork } from './interfaces/work.interface';

@Injectable()
export class WorkService {
  constructor(@InjectModel('Work') private workModel: Model<IWork>) {}

  async create(work: IWork): Promise<IWork> {
    const newWork = new this.workModel(work);
    return await newWork.save();
  }

  async readAll(): Promise<IWork[]> {
    return await this.workModel.find().exec();
  }

  async readById(id: string): Promise<IWork> {
    return await this.workModel.findById(id).exec();
  }

  async update(id: string, work: IWork): Promise<IWork> {
    return await this.workModel.findByIdAndUpdate(id, work, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.workModel.findByIdAndDelete(id);
  }
}
