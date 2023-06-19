import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, ok } from 'neverthrow';
import { Session } from '../../domain/model/session';
import { SessionRepository } from '../../domain/service/session.repository';
import { CreateSessionCommand } from './create-session.command';
import { SessionName } from '../../domain/model/session-name';
import { SessionMaxCapacity } from '../../domain/model/session-max-capacity';

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements ICommandHandler<CreateSessionCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(command: CreateSessionCommand): Promise<Result<null, DomainError>> {
    const session = Session.add(
      SessionName.from(command.name),
      SessionMaxCapacity.from(command.maxCapacity),
      command.date,
    );

    await this.sessionRepository.save(session);

    return ok(null);
  }
}
