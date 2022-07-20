import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule } from '../category/category.module';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { ChallengeController } from './controllers';
import { ChallengeSchema, MatchSchema } from './models';
import { ChallengeService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
    JogadoresModule,
    CategoryModule,
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
