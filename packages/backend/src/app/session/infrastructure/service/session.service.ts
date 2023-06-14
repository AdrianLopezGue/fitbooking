import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateSessionCommand } from '../../application/commands/create-session.command';
import { SessionDTO } from '../../application/service/session-finder.service';
import { GetSessionByIdQuery } from '../../application/query/get-session-by-id.query';

@Injectable()
export class SessionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSession(maxCapacity: number): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateSessionCommand(maxCapacity),
    );
  }

  async getSessionById(id: string): Promise<SessionDTO> {
    return this.queryBus.execute<IQuery, SessionDTO>(new GetSessionByIdQuery(id));
  }
}
