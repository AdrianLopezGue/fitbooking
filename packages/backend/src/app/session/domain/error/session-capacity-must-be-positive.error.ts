import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionCapacityMustBePositiveError extends DomainError {
  public static causeCannotBeNegative() {
    return new SessionCapacityMustBePositiveError(`Session capacity must be positive`);
  }
}
