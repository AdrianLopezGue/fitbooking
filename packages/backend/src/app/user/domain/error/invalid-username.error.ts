import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class InvalidUserNameError extends DomainError {
  public static causeIsEmpty(): InvalidUserNameError {
    return new InvalidUserNameError(`User Name should not be empty`);
  }
}
