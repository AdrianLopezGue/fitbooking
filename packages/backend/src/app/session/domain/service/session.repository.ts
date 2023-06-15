import { Session } from '../model/session';
import { SessionId } from '../model/session-id';

export interface SessionRepository {
  find(id: SessionId): Promise<Session | undefined>;
  save(session: Session): Promise<void>;
  delete(entity: Session): Promise<void>;
}
