import { SchemaFactory } from '@nestjs/mongoose';
import { BrandModel } from '../models/brand.model';

export const BrandSchema = SchemaFactory.createForClass(BrandModel);
