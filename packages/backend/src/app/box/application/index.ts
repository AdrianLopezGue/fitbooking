import { AcceptInvitationHandler } from './command/accept-invitation.handler';
import { CreateBoxHandler } from './command/create-box.handler';
import { InviteAthleteHandler } from './command/invite-athlete.handler';
import { GetAthletesByBoxQueryHandler } from './query/get-athletes-by-box.handler';
import { GetBoxByIdQueryHandler } from './query/get-box-by-id.handler';
import { GetBoxesByEmailQueryHandler } from './query/get-boxes-by-email.handler';

export const CommandHandlers = [
  CreateBoxHandler,
  InviteAthleteHandler,
  AcceptInvitationHandler,
];

export const QueryHandlers = [
  GetBoxByIdQueryHandler,
  GetBoxesByEmailQueryHandler,
  GetAthletesByBoxQueryHandler,
];
