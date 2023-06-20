import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class AthleteAlreadyExistingError extends DomainError {
  public static withEmail(email: string) {
    return new AthleteAlreadyExistingError(
      `Athlete with email: ${email} already existing in this box`,
    );
  }
}
