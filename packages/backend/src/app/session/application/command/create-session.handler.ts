import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { Session } from '../../domain/model/session';
import { SessionRepository } from '../../domain/service/session.repository';
import { CreateSessionCommand } from './create-session.command';
import { SessionName } from '../../domain/model/session-name';
import { SessionMaxCapacity } from '../../domain/model/session-max-capacity';
import { BoxId } from '../../../box/domain/model/box-id';

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements ICommandHandler<CreateSessionCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(
    command: CreateSessionCommand,
  ): Promise<Result<Promise<void>, DomainError>> {
    const boxData = Result.combine([
      SessionName.from(command.name),
      SessionMaxCapacity.from(command.maxCapacity),
    ]);

    return boxData
      .andThen(boxData =>
        Session.add(
          boxData[0],
          BoxId.from(command.boxId),
          boxData[1],
          command.date,
        ),
      )
      .map(session => this.sessionRepository.save(session));
  }
}
