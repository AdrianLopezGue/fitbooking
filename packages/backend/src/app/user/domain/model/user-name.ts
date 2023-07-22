import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { InvalidUserNameError } from '../error/invalid-username.error';
import { Result, err, ok } from 'neverthrow';

export class UserName extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): Result<UserName, InvalidUserNameError> {
    return name
      ? ok(new UserName({ value: name }))
      : err(InvalidUserNameError.causeIsEmpty());
  }

  get value() {
    return this.props.value;
  }
}
