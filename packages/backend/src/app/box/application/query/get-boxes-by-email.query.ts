import { IQuery } from '@nestjs/cqrs';

export class GetBoxesByEmailQuery implements IQuery {
  constructor(public readonly email: string) {}
}
