import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class BoxNameCannotBeEmpty extends DomainError {
  public static causeNameIsEmpty() {
    return new BoxNameCannotBeEmpty(`Box name cannot be empty`);
  }
}
