import { IQuery } from '@nestjs/cqrs';

export class GetSessionsByBoxQuery implements IQuery {
  constructor(public readonly boxId: string) {}
}
