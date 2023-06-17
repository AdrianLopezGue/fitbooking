import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserEmail extends ValueObject<{ value: string }> {
  public static from(email: string): UserEmail {
    if (!email) {
      throw new Error('User email should not be empty');
    }

    return new UserEmail({ value: email });
  }

  get value() {
    return this.props.value;
  }
}
