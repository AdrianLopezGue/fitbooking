import { ICommand } from '@nestjs/cqrs';

export class BookSeatCommand implements ICommand {
  constructor(public readonly id: string, public readonly athleteId: string) {}
}
