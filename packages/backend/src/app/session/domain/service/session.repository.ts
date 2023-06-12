import { UserId } from '../../../user';
import { Session } from '../model/session';
import { SessionId } from '../model/session-id';

export interface SessionRepository {
  find(): Promise<Session[]>;
  findById(id: SessionId): Promise<Session | undefined>;
  save(session: Session, assistant: UserId): Promise<void>;
}
