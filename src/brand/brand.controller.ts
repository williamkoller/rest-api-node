import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async add(@Body() data: any) {
    return await this.brandService.add(data);
  }

  @Get()
  async find() {
    return await this.brandService.find();
  }
}
