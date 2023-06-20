import { ICommand } from '@nestjs/cqrs';

export class InviteAthleteCommand implements ICommand {
  constructor(public readonly boxId: string, public readonly email: string) {}
}
