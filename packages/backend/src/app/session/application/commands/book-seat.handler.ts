import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookSeatCommand } from './book-seat.command';
import { Result, err } from 'neverthrow';
import { SessionRepository } from '../../domain/service/session.repository';
import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Session } from '../../domain/model/session';
import { UserId } from '../../../user';
import { SessionId } from '../../domain/model/session-id';
import { SessionNotFound } from '../../domain/exception/session-not-found.error';

@CommandHandler(BookSeatCommand)
export class BookSeatHandler implements ICommandHandler<BookSeatCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(command: BookSeatCommand): Promise<Result<void, DomainError>> {
    const sessionId = SessionId.fromString(command.id);
    const assistantId = UserId.fromString(command.userId);

    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      return err(SessionNotFound.with(sessionId.value));
    }

    return session.book(assistantId).asyncMap(s => this.sessionRepository.save(s));
  }
}
