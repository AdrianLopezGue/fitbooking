import { IQuery } from '@nestjs/cqrs';

export class GetSessionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
