import { Document } from 'mongoose';
import { Jogador } from 'src/modules/jogadores/models';

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Events[];
  players: Jogador[];
}

export interface Events {
  name: string;
  operation: string;
  value: number;
}
