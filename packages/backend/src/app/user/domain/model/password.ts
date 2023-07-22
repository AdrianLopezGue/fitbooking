import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { InvalidPasswordError } from '../error/invalid-password.error';
import { Result, err, ok } from 'neverthrow';

export class Password extends ValueObject<{
  value: string;
}> {
  protected readonly password: string;

  public constructor(value: { value: string }) {
    super(value);
    this.password = this.constructor.name;
  }

  public static from(password: string): Result<Password, InvalidPasswordError> {
    return password.length < 8
      ? err(InvalidPasswordError.causeIsTooShort(password))
      : ok(new Password({ value: password }));
  }

  get value(): string {
    return this.props.value;
  }
}
