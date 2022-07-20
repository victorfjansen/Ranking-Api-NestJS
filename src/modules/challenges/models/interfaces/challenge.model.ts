import { Document } from 'mongoose';
import { Jogador } from 'src/modules/jogadores/models';

import { ChallengeStatusEnum } from '../enums';

export interface Challenge extends Document {
  dateHourChallenge: Date;
  status: ChallengeStatusEnum;
  dateHourSolicitation: Date;
  dateHourResponse: Date;
  requester: Jogador;
  category: string;
  players: Jogador[];
  match: Match;
}

export interface Match extends Document {
  category: string;
  players: Jogador[];
  def: Jogador;
  result: Result[];
}

export interface Result {
  set: string;
}
