import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class InvalidUserEmailError extends DomainError {
  public static causeIsEmpty(): InvalidUserEmailError {
    return new InvalidUserEmailError(`User Email should not be empty`);
  }
}
