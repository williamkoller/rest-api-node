import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManager {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async clearCache(keyClear: string): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys();

    keys.forEach((key) => {
      if (key.startsWith(keyClear)) {
        this.cacheManager.del(key);
      }
    });
  }

  async setCache<T>(name: string, payload: T, ttl?: number): Promise<void> {
    const disableTtl = ttl ? ttl : 0;
    await this.cacheManager.set(name, payload, disableTtl);
  }

  async getCache<T>(name: string): Promise<T[]> {
    return await this.cacheManager.get<T>(name);
  }

  async resetCache(): Promise<void> {
    await this.cacheManager.reset();
  }
}
