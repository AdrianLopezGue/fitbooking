import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserAlreadyExistsError extends DomainError {
  public static causeUserAlreadyExists(email: string) {
    return new UserAlreadyExistsError(`User with given email already exists: ${email}`);
  }
}
