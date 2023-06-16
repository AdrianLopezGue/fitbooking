import { ICommand } from '@nestjs/cqrs';

export class CreateSessionCommand implements ICommand {
  constructor(public readonly name: string, public readonly maxCapacity: number) {}
}
