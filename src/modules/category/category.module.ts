import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controllers/category.controller';
import { CategorySchema } from './models/schema';
import { CategoryService } from './service/service.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
