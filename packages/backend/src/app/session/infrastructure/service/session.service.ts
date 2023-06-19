import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateSessionCommand } from '../../application/command/create-session.command';
import { SessionDTO } from '../../application/service/session-finder.service';
import { GetSessionByIdQuery } from '../../application/query/get-session-by-id.query';
import { BookSeatCommand } from '../../application/command/book-seat.command';
import { CancelSeatCommand } from '../../application/command/cancel-seat.command';
import { GetSessionsByDateQuery } from '../../application/query/get-sessions-by-date.query';

@Injectable()
export class SessionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSession(
    name: string,
    maxCapacity: number,
    date: Date,
  ): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateSessionCommand(name, maxCapacity, date),
    );
  }

  async bookSeat(id: string, athleteId: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new BookSeatCommand(id, athleteId),
    );
  }

  async cancelSeat(id: string, athleteId: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CancelSeatCommand(id, athleteId),
    );
  }

  async getSessionById(id: string): Promise<SessionDTO> {
    return this.queryBus.execute<IQuery, SessionDTO>(new GetSessionByIdQuery(id));
  }

  async getSessionsByDate(date: Date): Promise<SessionDTO[]> {
    return this.queryBus.execute<IQuery, SessionDTO[]>(new GetSessionsByDateQuery(date));
  }
}
