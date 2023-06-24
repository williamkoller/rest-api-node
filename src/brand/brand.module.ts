import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModel } from './models/brand.model';
import { BrandSchema } from './schemas/brand.schema';
import { BrandRepository } from './repositories/brand.repository';
import { CachingModule } from 'src/caching/caching.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: BrandModel.name,
        schema: BrandSchema,
      },
    ]),
    CachingModule,
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}
