import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookSeatCommand } from './book-seat.command';
import { Result, err, ok } from 'neverthrow';
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
    const sessionId = SessionId.from(command.id);
    const assistantId = UserId.from(command.userId);

    const session = await this.sessionRepository.find(sessionId);

    if (!session) {
      return err(SessionNotFound.with(sessionId.value));
    }

    const sessionBooked = session.book(assistantId);

    if (sessionBooked.isErr()) {
      return err(sessionBooked.error);
    }

    this.sessionRepository.save(sessionBooked.value);
    return ok(undefined);
  }
}
