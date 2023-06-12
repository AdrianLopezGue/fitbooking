import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookSeatCommand } from './book-seat.command';
import { Err, Result } from 'neverthrow';
import { SessionRepository } from '../../domain/service/session.repository';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Session } from '../../domain/model/session';
import { UserId } from '../../../user';
import { SessionId } from '../../domain/model/session-id';

@CommandHandler(BookSeatCommand)
export class BookSeatHandler implements ICommandHandler<BookSeatCommand> {
  constructor(
    @InjectAggregateRepository(Session)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(command: BookSeatCommand): Promise<Result<void, Error>> {
    const sessionId = SessionId.fromString(command.id);
    const assistantId = UserId.fromString(command.userId);

    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      return new Err(new Error(`Session with id: ${sessionId.value} does not exist`));
    }

    return session.book(assistantId);
  }
}
