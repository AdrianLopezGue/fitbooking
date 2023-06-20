import { CreateBoxHandler } from './command/create-box.handler';
import { InviteAthleteHandler } from './command/invite-athlete.handler';
import { GetBoxByIdQueryHandler } from './query/get-box-by-id.handler';

export const CommandHandlers = [CreateBoxHandler, InviteAthleteHandler];

export const QueryHandlers = [GetBoxByIdQueryHandler];
