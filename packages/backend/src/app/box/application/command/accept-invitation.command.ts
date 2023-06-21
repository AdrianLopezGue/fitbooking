import { ICommand } from '@nestjs/cqrs';

export class AcceptInvitationCommand implements ICommand {
  constructor(public readonly email: string, public readonly boxId: string) {}
}
