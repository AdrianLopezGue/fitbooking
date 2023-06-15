import { Session } from '../../domain/model/session';
import { SessionId } from '../../domain/model/session-id';
import { SessionRepository } from '../../domain/service/session.repository';

export class InMemorySessionRepository implements SessionRepository {
  constructor(public sessions: Session[] = []) {}

  async find(id: SessionId): Promise<Session | undefined> {
    return this.sessions.find((session: Session) => session.id.equals(id));
  }

  async save(session: Session): Promise<void> {
    const sessionFound = await this.find(session.id);

    if (sessionFound) {
      this.sessions = this.sessions.filter(s => !s.id.equals(session.id));
    }

    this.sessions.push(session);
  }

  delete(entity: Session): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Session[]> {
    return Promise.resolve(this.sessions);
  }
}
