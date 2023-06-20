import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { InvalidUserEmailError } from '../error/invalid-useremail.error';

export class UserEmail extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(email: string): UserEmail {
    if (!email) {
      throw InvalidUserEmailError.causeIsEmpty();
    }

    return new UserEmail({ value: email });
  }

  get value() {
    return this.props.value;
  }
}
