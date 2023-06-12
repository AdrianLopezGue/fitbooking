import { UserId } from '../../../../user';

import { Session } from '../../../domain/model/session';
import { SessionId } from '../../../domain/model/session-id';

export class SessionBuilder {
  private _session: Session;

  public constructor() {
    this._session = new Session(
      SessionId.fromString('0f6e8a59-7429-4930-9d38-3294552d2e40'),
      [],
      10,
    );
  }

  withId(id: string) {
    this._session = new Session(
      SessionId.fromString(id),
      this.session.assistants,
      this.session.maxCapacity,
    );
    return this;
  }

  withAssistants(assistants: UserId[]) {
    this._session = new Session(this.session.id, assistants, this.session.maxCapacity);
    return this;
  }

  withMaxCapacity(maxCapacity: number) {
    this._session = new Session(this.session.id, this.session.assistants, maxCapacity);
    return this;
  }

  get session(): Session {
    return this._session;
  }
}
