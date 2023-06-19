import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateBoxCommand } from '../../application/command/create-box.command';

@Injectable()
export class BoxService {
  constructor(private readonly commandBus: CommandBus) {}

  async createBox(name: string, userId: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateBoxCommand(name, userId),
    );
  }
}
