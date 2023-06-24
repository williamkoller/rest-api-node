import { Prop, Schema } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({
  collection: 'brands',
  timestamps: true,
})
export class BrandModel {
  @Prop({
    type: String,
    default: () => randomUUID(),
  })
  _id!: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}
