import { UserId } from '../user';

import { Session } from '../session/domain/model/session';
import { SessionId } from '../session/domain/model/session-id';

export class SessionBuilder {
  public id: string;
  public maxCapacity: number;
  public assistants: string[];

  public constructor() {
    this.id = '0f6e8a59-7429-4930-9d38-3294552d2e40';
    this.maxCapacity = 10;
    this.assistants = [];
  }

  build(): Session {
    return new Session(
      SessionId.fromString(this.id),
      this.assistants.map(assistant => UserId.fromString(assistant)),
      this.maxCapacity,
    );
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withAssistants(assistants: UserId[]) {
    this.assistants = assistants.map(assistant => assistant.value);
    return this;
  }

  withMaxCapacity(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
    return this;
  }
}