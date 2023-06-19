import { CreateBoxHandler } from './command/create-box.handler';
import { GetBoxByIdQueryHandler } from './query/get-box-by-id.handler';

export const CommandHandlers = [CreateBoxHandler];

export const QueryHandlers = [GetBoxByIdQueryHandler];
