import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionNameCannotBeEmpty } from '../error/session-name-cannot-be-empty.error';
import { Result, err, ok } from 'neverthrow';

export class SessionName extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): Result<SessionName, SessionNameCannotBeEmpty> {
    return name
      ? ok(new SessionName({ value: name }))
      : err(SessionNameCannotBeEmpty.causeNameIsEmpty());
  }

  get value() {
    return this.props.value;
  }
}
