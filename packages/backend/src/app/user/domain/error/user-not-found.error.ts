import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserNotFoundError extends DomainError {
  public static causeUserDoesNotExist() {
    return new UserNotFoundError('User was not found');
  }
}
