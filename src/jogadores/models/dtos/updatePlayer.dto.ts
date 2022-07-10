import { IsNotEmpty } from 'class-validator';

export class updatePlayer {
  @IsNotEmpty()
  readonly numberPhone: string;

  @IsNotEmpty()
  readonly name: string;
}
