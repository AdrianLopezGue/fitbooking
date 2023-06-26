import { Session } from '../session/domain/model/session';
import { SessionId } from '../session/domain/model/session-id';
import { SessionName } from '../session/domain/model/session-name';
import { SessionMaxCapacity } from '../session/domain/model/session-max-capacity';
import { AthleteId } from '../box/domain/model/athlete-id';
import { BoxId } from '../box/domain/model/box-id';

export class SessionBuilder {
  public id: string;
  public name: string;
  public boxId: string;
  public maxCapacity: number;
  public assistants: string[];

  public constructor() {
    this.id = '0f6e8a59-7429-4930-9d38-3294552d2e40';
    this.name = 'Defaul name';
    this.boxId = '8a5f1baa-ca5a-4479-80c7-10961affdae4';
    this.maxCapacity = 10;
    this.assistants = [];
  }

  build(): Session {
    return new Session(
      SessionId.from(this.id),
      SessionName.from(this.name),
      BoxId.from(this.boxId),
      this.assistants.map(assistant => AthleteId.from(assistant)),
      SessionMaxCapacity.from(this.maxCapacity),
    );
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withAssistants(assistants: AthleteId[]) {
    this.assistants = assistants.map(assistant => assistant.value);
    return this;
  }

  withMaxCapacity(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
    return this;
  }
}
