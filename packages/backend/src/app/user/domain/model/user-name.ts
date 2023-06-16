import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserName extends ValueObject<{ value: string }> {
  public static from(name: string): UserName {
    if (!name) {
      throw new Error('User name should not be empty');
    }

    return new UserName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
