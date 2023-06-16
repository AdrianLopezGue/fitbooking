import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionMaxCapacity extends ValueObject<{ value: number }> {
  public static from(capacity: number): SessionMaxCapacity {
    if (capacity <= 0) {
      throw new Error('Capacity must be positive');
    }

    return new SessionMaxCapacity({ value: capacity });
  }

  get value() {
    return this.props.value;
  }
}
