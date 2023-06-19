import { ICommand } from '@nestjs/cqrs';

export class CancelSeatCommand implements ICommand {
  constructor(public readonly id: string, public readonly athleteId: string) {}
}
