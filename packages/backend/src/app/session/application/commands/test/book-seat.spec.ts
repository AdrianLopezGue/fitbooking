import { SessionBuilder } from '../../../../test/session.builder';

import { BookSeatHandler } from '../book-seat.handler';
import { BookSeatCommand } from '../book-seat.command';

import { InMemorySessionRepository } from '../../../infrastructure';

import { UserId } from '../../../../user';
import { SessionId } from '../../../domain/model/session-id';

describe('Book seat command', () => {
  it('should book a seat if a session has empty seats', async () => {
    const session = new SessionBuilder()
      .withAssistants([UserId.generate(), UserId.generate()])
      .build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(session.id.value, '9f0a8969-d287-4b84-ad21-8909301d2bc6'),
    );

    expect(result.isOk()).toBe(true);

    const sessionFound = await sessionRepository.findById(session.id);
    expect(sessionFound.assistants).toHaveLength(3);
  });

  it('should return error if user is already in session', async () => {
    const userId = UserId.generate();
    const session = new SessionBuilder().withAssistants([userId]).build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(session.id.value, userId.value),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should return error if max capacity is already reached', async () => {
    const session = new SessionBuilder()
      .withAssistants([UserId.generate()])
      .withMaxCapacity(1)
      .build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(session.id.value, UserId.generate().value),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should return error if session with given id is not found', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(SessionId.generate().value, UserId.generate().value),
    );

    expect(result.isErr()).toBe(true);
  });
});
