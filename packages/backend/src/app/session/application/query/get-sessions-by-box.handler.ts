import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SessionDTO } from '@fitbooking/contracts';
import { SESSION_FINDER, SessionFinder } from '../service/session-finder.service';
import { GetSessionsByBoxQuery } from './get-sessions-by-box.query';

@QueryHandler(GetSessionsByBoxQuery)
export class GetSessionsByBoxHandler implements IQueryHandler {
  constructor(@Inject(SESSION_FINDER) private readonly sessionFinder: SessionFinder) {}

  async execute(query: GetSessionsByBoxQuery): Promise<SessionDTO[]> {
    return this.sessionFinder.findByBox(query.boxId);
  }
}
