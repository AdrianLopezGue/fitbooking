import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateSessionCommand } from '../../application/commands/create-session.command';

@Injectable()
export class SessionService {
  constructor(private readonly commandBus: CommandBus) {}

  async createSession(maxCapacity: number): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateSessionCommand(maxCapacity),
    );
  }
}
