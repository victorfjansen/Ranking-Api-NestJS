import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParameterValidator } from 'src/shared';

import { Category, CreateCategoryDto, UpdateCategory } from '../models';
import { CategoryService } from '../service';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Get('/:category')
  async getCategoryByName(
    @Param('category', ParameterValidator) category: string,
  ): Promise<Category> {
    return await this.categoryService.getCategoryByName(category);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateData: UpdateCategory,
    @Param('category', ParameterValidator) category: string,
  ): Promise<Category> {
    return await this.categoryService.updateCategoryByName(
      category,
      updateData,
    );
  }
}
