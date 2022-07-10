import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CriarJogadorDto, Jogador } from '../models';
import { updatePlayer } from '../models/dtos/updatePlayer.dto';
import { JogadoresService } from '../services';
import { ParameterValidator } from '../validators';

@Controller('api/vi/jogadores')
export class JogadoresController {
  constructor(private jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUser: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.createPlayer(createUser);
  }

  @Put('/:_id')
  async updateUser(
    @Param('_id', ParameterValidator) idUser: string,
    @Body() newData: updatePlayer,
  ): Promise<Jogador> {
    return await this.jogadoresService.updatePlayer(idUser, newData);
  }

  @Get()
  async getAllUsers(): Promise<Jogador[]> {
    return await this.jogadoresService.retornarJogadores();
  }

  @Get('/:_id')
  async getUserById(
    @Param('_id', ParameterValidator) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.getPlayerById(_id);
  }

  @Delete('/:_id')
  async deleteUser(@Param('_id', ParameterValidator) _id: string) {
    return await this.jogadoresService.deletePlayer(_id);
  }
}
