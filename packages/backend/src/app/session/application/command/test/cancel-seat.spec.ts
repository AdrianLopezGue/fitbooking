import { SessionBuilder } from '../../../../test/session.builder';

import { CancelSeatHandler } from '../cancel-seat.handler';
import { CancelSeatCommand } from '../cancel-seat.command';

import { InMemorySessionRepository } from '../../../infrastructure';

import { UserId } from '../../../../user';
import { SessionId } from '../../../domain/model/session-id';

describe('Cancel seat command', () => {
  it('should cancel a booked seat which belongs to a session', async () => {
    const userId = UserId.generate();
    const session = new SessionBuilder()
      .withAssistants([userId, UserId.generate()])
      .build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const cancelSeatHandler = new CancelSeatHandler(sessionRepository);

    const result = await cancelSeatHandler.execute(
      new CancelSeatCommand(session.id.value, userId.value),
    );

    expect(result.isOk()).toBe(true);

    const sessionFound = await sessionRepository.find(session.id);
    expect(sessionFound.assistants).toHaveLength(1);
  });

  it('should return error if user does not have a seat booked in session', async () => {
    const session = new SessionBuilder().withAssistants([UserId.generate()]).build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const cancelSeatHandler = new CancelSeatHandler(sessionRepository);

    const result = await cancelSeatHandler.execute(
      new CancelSeatCommand(session.id.value, '550bf84b-ecab-48e8-b2f8-ac1eee81b54d'),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should return error if session with given id is not found', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const cancelSeatHandler = new CancelSeatHandler(sessionRepository);

    const result = await cancelSeatHandler.execute(
      new CancelSeatCommand(SessionId.generate().value, UserId.generate().value),
    );

    expect(result.isErr()).toBe(true);
  });
});
