import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionNameCannotBeEmpty extends DomainError {
  public static causeNameIsEmpty() {
    return new SessionNameCannotBeEmpty(`Session name cannot be empty`);
  }
}
