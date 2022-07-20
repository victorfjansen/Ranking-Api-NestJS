import { IsOptional } from 'class-validator';
import { ChallengeStatusEnum } from '../enums';

export class UpdateChallengeDto {
  @IsOptional()
  dateHourChallenge: Date;

  @IsOptional()
  status: ChallengeStatusEnum;
}
