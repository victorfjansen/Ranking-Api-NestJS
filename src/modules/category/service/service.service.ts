import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { badRequestException } from 'src/shared';

import { Category, CreateCategoryDto, UpdateCategory } from '../models';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories') private readonly categoryModel: Model<Category>,
  ) {}

  private async findCategory(category: string) {
    return await this.categoryModel.findOne({ category }).exec();
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const { category } = categoryData;
    const foundCategory = await this.findCategory(category);

    foundCategory && badRequestException('Essa categoria já existe!');
    return await this.categoryModel.create(categoryData);
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async getCategoryByName(category: string): Promise<Category> {
    const foundCategory = await this.findCategory(category);

    !foundCategory &&
      badRequestException(`Ops! A categoria ${category} não existe`);

    return foundCategory;
  }

  async updateCategoryByName(category: string, updateData: UpdateCategory) {
    const foundCategory = await this.findCategory(category);

    !foundCategory &&
      badRequestException(`A categoria ${category} não foi encontrada`);

    return await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateData })
      .exec();
  }
}
