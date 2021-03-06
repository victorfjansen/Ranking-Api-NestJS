import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JogadoresController } from './controllers/jogadores.controller';
import { JogadorSchema } from './models/schemas';
import { JogadoresService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogadores', schema: JogadorSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports: [JogadoresService],
})
export class JogadoresModule {}
