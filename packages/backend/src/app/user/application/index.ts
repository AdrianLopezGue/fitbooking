import { CreateUserHandler } from './commands/create-user.handler';
import { GetUserByEmailQueryHandler } from './query/get-user-by-email.handler';
import { GetUserByIdQueryHandler } from './query/get-user-by-id.handler';

export const CommandHandlers = [CreateUserHandler];

export const QueryHandlers = [GetUserByIdQueryHandler, GetUserByEmailQueryHandler];
