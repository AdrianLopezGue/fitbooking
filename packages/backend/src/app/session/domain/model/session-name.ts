import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionName extends ValueObject<{ value: string }> {
  public static from(name: string): SessionName {
    if (!name) {
      throw new Error('Session name should not be empty');
    }

    return new SessionName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
