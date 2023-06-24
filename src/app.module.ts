import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { CachingModule } from './caching/caching.module';
import { CarModule } from './car/car.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandModule } from './brand/brand.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { SpeedwayModule } from './speedway/speedway.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.PATH_ENV }),
    HealthModule,
    DatabaseModule,
    CachingModule,
    CarModule,
    CategoriesModule,
    BrandModule,
    EvaluationModule,
    SpeedwayModule,
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
