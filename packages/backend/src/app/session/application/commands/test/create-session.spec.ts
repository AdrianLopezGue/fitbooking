import { InMemorySessionRepository } from '../../../infrastructure';
import { CreateSessionCommand } from '../create-session.command';
import { CreateSessionHandler } from '../create-session.handler';

describe('Create session handler', () => {
  it('should create a session', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const bookSeatHandler = new CreateSessionHandler(sessionRepository);

    const result = await bookSeatHandler.execute(new CreateSessionCommand(1));

    expect(result.isOk()).toBe(true);

    const sessionsFound = await sessionRepository.find();
    expect(sessionsFound).toHaveLength(1);
    expect(sessionsFound[0].maxCapacity).toBe(1);
    expect(sessionsFound[0].assistants).toHaveLength(0);
  });
});
