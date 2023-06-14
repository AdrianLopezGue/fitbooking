import { BookSeatHandler } from './commands/book-seat.handler';
import { CreateSessionHandler } from './commands/create-session.handler';
import { GetSessionByIdHandler } from './query/get-session-by-id.handler';

export const CommandHandlers = [BookSeatHandler, CreateSessionHandler];

export const QueryHandlers = [GetSessionByIdHandler];
