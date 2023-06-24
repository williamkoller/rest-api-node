import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../interfaces/brand.interface';
import { BrandModel } from '../models/brand.model';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectModel(BrandModel.name) private readonly brandModel: Model<Brand>,
  ) {}

  async insert(data: any) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async loadAll() {
    console.time('time');
    const brands = await this.brandModel.find({}, { __v: false });

    console.timeEnd('time');
    return brands;
  }
}
