import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err } from 'neverthrow';
import { AthleteId } from '../../../box/domain/model/athlete-id';
import { SessionNotFound } from '../../domain/error/session-not-found.error';
import { Session } from '../../domain/model/session';
import { SessionId } from '../../domain/model/session-id';
import { SessionRepository } from '../../domain/service/session.repository';
import { BookSeatCommand } from './book-seat.command';

@CommandHandler(BookSeatCommand)
export class BookSeatHandler implements ICommandHandler<BookSeatCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(command: BookSeatCommand): Promise<Result<Promise<void>, DomainError>> {
    const sessionId = SessionId.from(command.id);
    const session = await this.sessionRepository.find(sessionId);

    if (!session) {
      return err(SessionNotFound.with(sessionId.value));
    }

    const assistantId = AthleteId.from(command.athleteId);
    return session.book(assistantId).map(session => this.sessionRepository.save(session));
  }
}
