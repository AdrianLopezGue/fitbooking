import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { InvalidUserNameError } from '../error/invalid-username.error';

export class UserName extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): UserName {
    if (!name) {
      throw InvalidUserNameError.causeIsEmpty();
    }

    return new UserName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
