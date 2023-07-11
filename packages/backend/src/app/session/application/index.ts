import { BookSeatHandler } from './command/book-seat.handler';
import { CancelSeatHandler } from './command/cancel-seat.handler';
import { CreateSessionHandler } from './command/create-session.handler';
import { GetSessionByIdHandler } from './query/get-session-by-id.handler';
import { GetSessionsByAthleteAndDateHandler } from './query/get-sessions-by-athlete-and-date.handler';
import { GetSessionsByDateAndBoxHandler } from './query/get-sessions-by-date-and-box.handler';

export const CommandHandlers = [BookSeatHandler, CancelSeatHandler, CreateSessionHandler];

export const QueryHandlers = [
  GetSessionByIdHandler,
  GetSessionsByDateAndBoxHandler,
  GetSessionsByAthleteAndDateHandler,
];
