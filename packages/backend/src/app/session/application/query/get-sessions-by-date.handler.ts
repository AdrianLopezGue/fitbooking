import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  SESSION_FINDER,
  SessionFinder,
  SessionDTO,
} from '../service/session-finder.service';
import { GetSessionsByDateQuery } from './get-sessions-by-date.query';

@QueryHandler(GetSessionsByDateQuery)
export class GetSessionsByDateHandler implements IQueryHandler {
  constructor(@Inject(SESSION_FINDER) private readonly sessionFinder: SessionFinder) {}

  async execute(query: GetSessionsByDateQuery): Promise<SessionDTO[]> {
    return this.sessionFinder.findByDate(query.date);
  }
}
