import { IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/modules/jogadores/models';
import { Result } from '../interfaces';

export class AssignChallengeToMatchDto {
  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  result: Result[];
}
