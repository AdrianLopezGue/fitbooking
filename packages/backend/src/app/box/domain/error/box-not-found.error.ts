import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class BoxNotFoundError extends DomainError {
  public static causeBoxDoesNotExist() {
    return new BoxNotFoundError('Box was not found');
  }
}
