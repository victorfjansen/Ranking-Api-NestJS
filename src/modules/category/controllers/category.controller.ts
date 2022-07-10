import { Body, Controller } from '@nestjs/common';

import { CreateCategoryDto } from '../models';

@Controller('api/v1/categories')
export class CategoryController {
  constructor() {}

  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {}
}
