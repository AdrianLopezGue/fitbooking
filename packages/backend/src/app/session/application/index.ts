import { BookSeatHandler } from './commands/book-seat.handler';
import { CancelSeatHandler } from './commands/cancel-seat.handler';
import { CreateSessionHandler } from './commands/create-session.handler';
import { GetSessionByIdHandler } from './query/get-session-by-id.handler';
import { GetSessionsByDateHandler } from './query/get-sessions-by-date.handler';

export const CommandHandlers = [BookSeatHandler, CancelSeatHandler, CreateSessionHandler];

export const QueryHandlers = [GetSessionByIdHandler, GetSessionsByDateHandler];
