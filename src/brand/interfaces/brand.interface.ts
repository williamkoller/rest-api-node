import { Document } from 'mongoose';

export interface Brand extends Document {
  readonly name: string;
  readonly country: string;
  readonly year: number;
  readonly price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
