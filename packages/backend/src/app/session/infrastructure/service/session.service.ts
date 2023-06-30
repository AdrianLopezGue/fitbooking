import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateSessionCommand } from '../../application/command/create-session.command';
import { GetSessionByIdQuery } from '../../application/query/get-session-by-id.query';
import { BookSeatCommand } from '../../application/command/book-seat.command';
import { CancelSeatCommand } from '../../application/command/cancel-seat.command';
import { GetSessionsByDateAndBoxQuery } from '../../application/query/get-sessions-by-date-and-box.query';
import { SessionDTO } from '@fitbooking/contracts';

@Injectable()
export class SessionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSession(
    name: string,
    boxId: string,
    maxCapacity: number,
    date: Date,
  ): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateSessionCommand(name, boxId, maxCapacity, date),
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

  async getSessionsByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[]> {
    return this.queryBus.execute<IQuery, SessionDTO[]>(
      new GetSessionsByDateAndBoxQuery(date, boxId),
    );
  }
}
