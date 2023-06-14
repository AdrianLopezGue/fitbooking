import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  SESSION_FINDER,
  SessionFinder,
  SessionDTO,
} from '../service/session-finder.service';
import { GetSessionByIdQuery } from './get-session-by-id.query';

@QueryHandler(GetSessionByIdQuery)
export class GetSessionByIdHandler implements IQueryHandler {
  constructor(@Inject(SESSION_FINDER) private readonly sessionFinder: SessionFinder) {}

  async execute(query: GetSessionByIdQuery): Promise<SessionDTO> {
    return this.sessionFinder.find(query.id);
  }
}
