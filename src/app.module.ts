import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://victorfjansen:VCF09Arf7xTaD18y@cluster0.snhhehv.mongodb.net/?retryWrites=true&w=majority',
    ),
    JogadoresModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
