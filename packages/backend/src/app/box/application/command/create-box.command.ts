import { ICommand } from '@nestjs/cqrs';

export class CreateBoxCommand implements ICommand {
  constructor(public readonly name: string, public readonly userId: string) {}
}
