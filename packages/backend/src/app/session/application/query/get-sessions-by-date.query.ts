import { IQuery } from '@nestjs/cqrs';

export class GetSessionsByDateQuery implements IQuery {
  constructor(public readonly date: Date) {}
}
