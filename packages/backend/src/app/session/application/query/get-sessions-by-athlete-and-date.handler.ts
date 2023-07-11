import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SESSION_FINDER, SessionFinder } from '../service/session-finder.service';
import { SessionsBookedDTO } from '@fitbooking/contracts';
import { GetSessionsByAthleteAndDateQuery } from './get-sessions-by-athlete-and-date.query';

@QueryHandler(GetSessionsByAthleteAndDateQuery)
export class GetSessionsByAthleteAndDateHandler implements IQueryHandler {
  constructor(@Inject(SESSION_FINDER) private readonly sessionFinder: SessionFinder) {}

  async execute(query: GetSessionsByAthleteAndDateQuery): Promise<SessionsBookedDTO> {
    return this.sessionFinder.findByAthleteAndDate(
      query.athleteId,
      query.month,
      query.year,
    );
  }
}
