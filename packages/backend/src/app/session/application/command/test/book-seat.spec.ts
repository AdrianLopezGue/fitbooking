import { SessionBuilder } from '../../../../test/session.builder';

import { BookSeatCommand } from '../book-seat.command';
import { BookSeatHandler } from '../book-seat.handler';

import { InMemorySessionRepository } from '../../../infrastructure';

import { AthleteId } from '../../../../box/domain/model/athlete-id';
import { SessionId } from '../../../domain/model/session-id';

describe('Book seat command', () => {
  it('should book a seat if a session has empty seats', async () => {
    const session = new SessionBuilder()
      .withAssistants([AthleteId.generate(), AthleteId.generate()])
      .build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(session.id.value, '9f0a8969-d287-4b84-ad21-8909301d2bc6'),
    );

    expect(result.isOk()).toBe(true);

    const sessionFound = await sessionRepository.find(session.id);
    expect(sessionFound.assistants).toHaveLength(3);
  });

  it('should return error if athlete is already in session', async () => {
    const athleteId = AthleteId.generate();
    const session = new SessionBuilder().withAssistants([athleteId]).build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(session.id.value, athleteId.value),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should return error if max capacity is already reached', async () => {
    const session = new SessionBuilder()
      .withAssistants([AthleteId.generate()])
      .withMaxCapacity(1)
      .build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(session.id.value, AthleteId.generate().value),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should return error if session with given id is not found', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const bookSeatHandler = new BookSeatHandler(sessionRepository);

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(SessionId.generate().value, AthleteId.generate().value),
    );

    expect(result.isErr()).toBe(true);
  });
});
