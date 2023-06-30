import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SESSION_FINDER, SessionFinder } from '../service/session-finder.service';
import { GetSessionsByDateAndBoxQuery } from './get-sessions-by-date-and-box.query';
import { SessionDTO } from '@fitbooking/contracts';

@QueryHandler(GetSessionsByDateAndBoxQuery)
export class GetSessionsByDateAndBoxHandler implements IQueryHandler {
  constructor(@Inject(SESSION_FINDER) private readonly sessionFinder: SessionFinder) {}

  async execute(query: GetSessionsByDateAndBoxQuery): Promise<SessionDTO[]> {
    return this.sessionFinder.findByDateAndBox(query.date, query.boxId);
  }
}
