import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err } from 'neverthrow';
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
    const sessionId = SessionId.fromString(command.id);
    const assistantId = UserId.fromString(command.userId);

    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      return err(SessionNotFound.with(sessionId.value));
    }

    return session.cancel(assistantId).asyncMap(s => this.sessionRepository.save(s));
  }
}
