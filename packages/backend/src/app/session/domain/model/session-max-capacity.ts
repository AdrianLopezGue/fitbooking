import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionCapacityMustBePositiveError } from '../error/session-capacity-must-be-positive.error';

export class SessionMaxCapacity extends ValueObject<{ value: number }> {
  public static from(capacity: number): SessionMaxCapacity {
    if (capacity <= 0) {
      throw SessionCapacityMustBePositiveError.causeCannotBeNegative();
    }

    return new SessionMaxCapacity({ value: capacity });
  }

  get value() {
    return this.props.value;
  }
}
