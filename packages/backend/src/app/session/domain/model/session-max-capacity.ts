import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionCapacityMustBePositiveError } from '../error/session-capacity-must-be-positive.error';
import { Result, err, ok } from 'neverthrow';

export class SessionMaxCapacity extends ValueObject<{ value: number }> {
  protected readonly name: string;

  public constructor(value: { value: number }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(
    capacity: number,
  ): Result<SessionMaxCapacity, SessionCapacityMustBePositiveError> {
    return capacity > 0
      ? ok(new SessionMaxCapacity({ value: capacity }))
      : err(SessionCapacityMustBePositiveError.causeCannotBeNegative());
  }

  get value() {
    return this.props.value;
  }
}
