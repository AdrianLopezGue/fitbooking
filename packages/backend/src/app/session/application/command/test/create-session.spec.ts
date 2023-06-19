import { InMemorySessionRepository } from '../../../infrastructure';
import { CreateSessionCommand } from '../create-session.command';
import { CreateSessionHandler } from '../create-session.handler';

describe('Create session handler', () => {
  it('should create a session', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const bookSeatHandler = new CreateSessionHandler(sessionRepository);
    const sessionName = 'Session Name';
    const sessionDate = new Date();

    const result = await bookSeatHandler.execute(
      new CreateSessionCommand(sessionName, 1, sessionDate),
    );

    expect(result.isOk()).toBe(true);

    const sessionsFound = await sessionRepository.findAll();
    expect(sessionsFound).toHaveLength(1);
    expect(sessionsFound[0].maxCapacity.value).toBe(1);
    expect(sessionsFound[0].assistants).toHaveLength(0);
    expect(sessionsFound[0].name.value).toBe(sessionName);
    expect(sessionsFound[0].date).toBe(sessionDate);
  });

  it('should should throw error if capacity is negative', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const bookSeatHandler = new CreateSessionHandler(sessionRepository);
    const sessionName = 'Session Name';
    const sessionDate = new Date();

    await expect(
      bookSeatHandler.execute(new CreateSessionCommand(sessionName, -1, sessionDate)),
    ).rejects.toThrow(Error);
  });

  it('should should throw error if name is empty', async () => {
    const sessionRepository = new InMemorySessionRepository([]);
    const bookSeatHandler = new CreateSessionHandler(sessionRepository);
    const emptySessionName = '';
    const sessionDate = new Date();

    await expect(
      bookSeatHandler.execute(new CreateSessionCommand(emptySessionName, 1, sessionDate)),
    ).rejects.toThrow(Error);
  });
});