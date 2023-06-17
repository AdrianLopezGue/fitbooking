import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err, ok } from 'neverthrow';
import { SessionRepository } from '../../domain/service/session.repository';
import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Session } from '../../domain/model/session';
import { UserId } from '../../../user';
import { SessionId } from '../../domain/model/session-id';
import { CancelSeatCommand } from './cancel-seat.command';
import { SessionNotFound } from '../../domain/exception/session-not-found.error';

@CommandHandler(CancelSeatCommand)
export class CancelSeatHandler implements ICommandHandler<CancelSeatCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(command: CancelSeatCommand): Promise<Result<void, DomainError>> {
    const sessionId = SessionId.from(command.id);
    const assistantId = UserId.from(command.userId);

    const session = await this.sessionRepository.find(sessionId);

    if (!session) {
      return err(SessionNotFound.with(sessionId.value));
    }

    const canceledSession = session.cancel(assistantId);

    if (canceledSession.isErr()) {
      return err(canceledSession.error);
    }

    this.sessionRepository.save(canceledSession.value);
    return ok(undefined);
  }
}
