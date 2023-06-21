import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class AthleteIsAlreadyConfirmedError extends DomainError {
  public static causeIsConfirmed(id: string) {
    return new AthleteIsAlreadyConfirmedError(
      `Athlete with id: ${id} is already confirmed`,
    );
  }
}
