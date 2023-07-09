import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class BoxLocationCannotBeEmpty extends DomainError {
  public static causeNameIsEmpty() {
    return new BoxLocationCannotBeEmpty(`Box location cannot be empty`);
  }
}
