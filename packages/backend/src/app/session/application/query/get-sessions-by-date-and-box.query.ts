import { IQuery } from '@nestjs/cqrs';

export class GetSessionsByDateAndBoxQuery implements IQuery {
  constructor(public readonly date: Date, public readonly boxId: string) {}
}
