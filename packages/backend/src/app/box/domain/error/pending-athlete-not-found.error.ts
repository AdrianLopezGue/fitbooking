import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class PendingAthleteNotFoundError extends DomainError {
  public static withEmail(email: string) {
    return new PendingAthleteNotFoundError(
      `Pending athlete with email: ${email} not found`,
    );
  }
}
