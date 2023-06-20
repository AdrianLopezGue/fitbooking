import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class InvalidPasswordError extends DomainError {
  public static causeIsTooShort(value: string): InvalidPasswordError {
    return new InvalidPasswordError(`Given password is too short: ${value}`);
  }
}
