import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Jogador } from 'src/modules/jogadores/models';

export class createChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dateHourChallenge: Date;

  @IsNotEmpty()
  requester: Jogador;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Jogador[];
}
