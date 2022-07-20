import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule } from './modules/category/category.module';
import { ChallengeModule } from './modules/challenges/challenge.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://victorfjansen:VCF09Arf7xTaD18y@cluster0.snhhehv.mongodb.net/?retryWrites=true&w=majority',
    ),
    JogadoresModule,
    CategoryModule,
    ChallengeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
