import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err } from 'neverthrow';
import { SessionRepository } from '../../domain/service/session.repository';
import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Session } from '../../domain/model/session';
import { SessionId } from '../../domain/model/session-id';
import { CancelSeatCommand } from './cancel-seat.command';
import { SessionNotFound } from '../../domain/error/session-not-found.error';
import { AthleteId } from '../../../box/domain/model/athlete-id';

@CommandHandler(CancelSeatCommand)
export class CancelSeatHandler implements ICommandHandler<CancelSeatCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(command: CancelSeatCommand): Promise<Result<Promise<void>, DomainError>> {
    const sessionId = SessionId.from(command.id);
    const session = await this.sessionRepository.find(sessionId);

    if (!session) {
      return err(SessionNotFound.with(sessionId.value));
    }

    const assistantId = AthleteId.from(command.athleteId);
    return session
      .cancel(assistantId)
      .map(session => this.sessionRepository.save(session));
  }
}
