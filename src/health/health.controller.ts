import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}
  @Get()
  healthCheck() {
    return this.health.check([
      async () => this.mongoose.pingCheck('mongoose'),
      async () => this.mongoose.pingCheck('redis'),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      // The used disk storage should not exceed 50% of the full disk size
      () =>
        this.disk.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
      // The used disk storage should not exceed 250 GB
      () =>
        this.disk.checkStorage('disk health', {
          threshold: 250 * 1024 * 1024 * 1024,
          path: '/',
        }),
    ]);
  }
}
