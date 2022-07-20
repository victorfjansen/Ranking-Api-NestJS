import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JogadoresModule } from '../jogadores/jogadores.module';
import { CategoryController } from './controllers/category.controller';
import { CategorySchema } from './models/schema';
import { CategoryService } from './service/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
    JogadoresModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
