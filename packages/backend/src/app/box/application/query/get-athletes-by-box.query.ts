import { IQuery } from '@nestjs/cqrs';

export class GetAthletesByBoxQuery implements IQuery {
  constructor(public readonly boxId: string) {}
}
