import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserByIdQueryHandler } from './query/get-user-by-id.handler';

export const CommandHandlers = [CreateUserHandler];

export const QueryHandlers = [GetUserByIdQueryHandler];
