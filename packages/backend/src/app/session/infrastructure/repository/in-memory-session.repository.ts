import { UserId } from '../../../user';
import { Session } from '../../domain/model/session';
import { SessionId } from '../../domain/model/session-id';
import { SessionRepository } from '../../domain/service/session.repository';

export class InMemorySessionRepository implements SessionRepository {
  constructor(public readonly sessions: Session[]) {}

  async find(): Promise<Session[]> {
    return this.sessions;
  }

  async findById(id: SessionId): Promise<Session | undefined> {
    return this.sessions.find((session: Session) => session.id.equals(id));
  }

  async save(session: Session, assistant: UserId): Promise<void> {
    this.sessions.forEach((inMemorySession: Session) => {
      if (session.id.equals(inMemorySession.id)) {
        inMemorySession.book(assistant);
      }
    });
  }
}
