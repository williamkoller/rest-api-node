import { Injectable } from '@nestjs/common';
import { BrandRepository } from './repositories/brand.repository';
import { CacheManager } from '../caching/cache-manager';
import { Brand } from './interfaces/brand.interface';

@Injectable()
export class BrandService {
  constructor(
    private readonly brandRepo: BrandRepository,
    private readonly cacheManager: CacheManager,
  ) {}

  async add(data: any) {
    const newBrand = await this.brandRepo.insert(data);
    return newBrand;
  }

  async find() {
    const brands = await this.brandRepo.loadAll();

    const now = new Date();
    const verifyDateBrandsCreations = brands.filter(
      (brand) => brand.createdAt <= now,
    );

    if (verifyDateBrandsCreations) {
      await this.cacheManager.setCache('BRANDS', brands, 2000);
      const cache = await this.cacheManager.getCache<Brand>('BRANDS');

      if (cache) {
        return {
          data: cache,
          count: cache.length,
          fromRedis: 'fetch from redis',
        };
      }

      return;
    }

    return {
      data: brands,
      count: brands.length,
      fromDb: 'fecth from database',
    };
  }
}
