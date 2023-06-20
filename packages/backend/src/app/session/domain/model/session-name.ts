import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionNameCannotBeEmpty } from '../error/session-name-cannot-be-empty.error';

export class SessionName extends ValueObject<{ value: string }> {
  public static from(name: string): SessionName {
    if (!name) {
      throw SessionNameCannotBeEmpty.causeNameIsEmpty();
    }

    return new SessionName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
