import { PipeTransform } from '@nestjs/common';
import { badRequestException } from 'src/shared';

import { ChallengeStatusEnum } from '../../models';

export class ChallengeStatusValidatePipe implements PipeTransform {
  readonly statusPermitidos = [
    ChallengeStatusEnum.ACEITO,
    ChallengeStatusEnum.NEGADO,
    ChallengeStatusEnum.CANCELADO,
  ];

  private statusIsValid(status: any) {
    const idx = this.statusPermitidos.indexOf(status);
    return idx !== -1;
  }

  transform(value: any) {
    const status = value.status.toUpperCase();

    !this.statusIsValid(status) &&
      badRequestException(`${status} não é válido!`);
  }
}
