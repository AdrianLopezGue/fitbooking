import { SessionBuilder } from '../../../../test/session.builder';
import { CancelSeatHandler } from '../cancel-seat.handler';
import { CancelSeatCommand } from '../cancel-seat.command';
import { InMemorySessionRepository } from '../../../infrastructure';
import { SessionId } from '../../../domain/model/session-id';
import { AthleteId } from '../../../../box/domain/model/athlete-id';
import { AssistantNotFound } from '../../../domain/error/assistant-not-found.error';
import { SessionNotFound } from '../../../domain/error/session-not-found.error';

describe('Cancel seat command', () => {
  it('should cancel a booked seat which belongs to a session', async () => {
    const athleteId = AthleteId.generate();
    const session = new SessionBuilder()
      .withAssistants([athleteId, AthleteId.generate()])
      .build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const cancelSeatHandler = new CancelSeatHandler(sessionRepository);

    const result = await cancelSeatHandler.execute(
      new CancelSeatCommand(session.id.value, athleteId.value),
    );

    expect(result.isOk()).toBe(true);

    const sessionFound = await sessionRepository.find(session.id);
    expect(sessionFound.assistants).toHaveLength(1);
  });

  it('should return error if user does not have a seat booked in session', async () => {
    const session = new SessionBuilder().withAssistants([AthleteId.generate()]).build();
    const sessionRepository = new InMemorySessionRepository([session]);
    const cancelSeatHandler = new CancelSeatHandler(sessionRepository);

    const result = await cancelSeatHandler.execute(
      new CancelSeatCommand(session.id.value, '550bf84b-ecab-48e8-b2f8-ac1eee81b54d'),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(AssistantNotFound);
  });

  it('should return error if session with given id is not found', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const cancelSeatHandler = new CancelSeatHandler(sessionRepository);

    const result = await cancelSeatHandler.execute(
      new CancelSeatCommand(SessionId.generate().value, AthleteId.generate().value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(SessionNotFound);
  });
});
