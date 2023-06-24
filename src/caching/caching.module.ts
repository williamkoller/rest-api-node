import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { CacheManager } from './cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        ttl: config.get('CACHE_TTL'),
        max: config.get('CACHE_MAX'), // maximum number of items in cache
        isGlobal: true,
        store: redisStore as any,
        host: config.get<string>('REDIS_HOST'),
        port: config.get<number>('REDIS_PORT'),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    CacheManager,
  ],
  exports: [CacheManager],
})
export class CachingModule {}
