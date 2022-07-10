import { BadRequestException } from '@nestjs/common';

export const badRequestException = (message) => {
  throw new BadRequestException(message);
};
