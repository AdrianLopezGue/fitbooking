import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateSessionCommand } from '../../application/command/create-session.command';
import { GetSessionByIdQuery } from '../../application/query/get-session-by-id.query';
import { BookSeatCommand } from '../../application/command/book-seat.command';
import { CancelSeatCommand } from '../../application/command/cancel-seat.command';
import { GetSessionsByDateAndBoxQuery } from '../../application/query/get-sessions-by-date-and-box.query';
import { SessionDTO } from '@fitbooking/contracts';
import { GetSessionsByAthleteAndDateQuery } from '../../application/query/get-sessions-by-athlete-and-date.query';
import { GetSessionsByBoxQuery } from '../../application/query/get-sessions-by-box.query';

@Injectable()
export class SessionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createSession(
    name: string,
    boxId: string,
    maxCapacity: number,
    date: Date,
  ): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateSessionCommand(name, boxId, maxCapacity, date),
    );
  }

  bookSeat(id: string, athleteId: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new BookSeatCommand(id, athleteId),
    );
  }

  cancelSeat(id: string, athleteId: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CancelSeatCommand(id, athleteId),
    );
  }

  getSessionById(id: string): Promise<SessionDTO> {
    return this.queryBus.execute<IQuery, SessionDTO>(new GetSessionByIdQuery(id));
  }

  getSessionsByBox(boxId: string): Promise<SessionDTO[]> {
    return this.queryBus.execute<IQuery, SessionDTO[]>(new GetSessionsByBoxQuery(boxId));
  }

  getSessionsByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[]> {
    return this.queryBus.execute<IQuery, SessionDTO[]>(
      new GetSessionsByDateAndBoxQuery(date, boxId),
    );
  }

  getBookedSessionsByAthletedAndDate(
    athleteId: string,
    month: number,
    year: number,
  ): Promise<SessionDTO[]> {
    return this.queryBus.execute<IQuery, SessionDTO[]>(
      new GetSessionsByAthleteAndDateQuery(athleteId, month, year),
    );
  }
}
