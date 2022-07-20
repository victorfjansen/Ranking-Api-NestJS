import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notFoundException } from 'src/shared';

import { CriarJogadorDto, Jogador } from '../models';
import { updatePlayer } from '../models/dtos/updatePlayer.dto';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogadores') private readonly playerModel: Model<Jogador>,
  ) {}

  private async findPlayer(_id: string) {
    let player;
    try {
      player = await this.playerModel.findOne({ _id }).exec();
    } catch (e) {
      notFoundException('Ops! Usuário não encontrado!');
    }
    return player;
  }

  async retornarJogadores(): Promise<Jogador[]> {
    return await this.playerModel.find().exec();
  }

  async createPlayer(playerDto: CriarJogadorDto): Promise<Jogador> {
    return await this.playerModel.create(playerDto);
  }

  async updatePlayer(_id, newData: updatePlayer): Promise<Jogador> {
    const player = await this.findPlayer(_id);
    if (player) {
      await this.playerModel
        .findOneAndUpdate({ _id }, { $set: newData })
        .exec();
      return this.findPlayer(_id);
    } else throw new BadRequestException('usuário não encontrado!');
  }

  async getPlayerById(_id: string): Promise<Jogador> {
    const player = await this.findPlayer(_id);
    return player;
  }

  async deletePlayer(_id: string): Promise<Jogador> {
    const player = await this.findPlayer(_id);
    if (player) {
      await this.playerModel.deleteOne({ _id }).exec();
      return player;
    } else throw new NotFoundException('Jogador não encontrado');
  }
}
