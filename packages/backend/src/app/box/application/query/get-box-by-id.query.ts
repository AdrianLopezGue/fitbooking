import { IQuery } from '@nestjs/cqrs';

export class GetBoxByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
