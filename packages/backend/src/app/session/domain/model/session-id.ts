import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class SessionId extends Id {
  static generate(): SessionId {
    return new SessionId(uuid());
  }

  public static from(id: string): SessionId {
    return new SessionId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
