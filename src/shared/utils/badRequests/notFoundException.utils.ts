import { NotFoundException } from '@nestjs/common';

export const notFoundException = (message: string) => {
  throw new NotFoundException(message);
};
