import { IQuery } from '@nestjs/cqrs';

export class GetSessionsByAthleteAndDateQuery implements IQuery {
  constructor(
    public readonly athleteId: string,
    public readonly month: number,
    public readonly year: number,
  ) {}
}
