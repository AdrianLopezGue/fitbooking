import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionWithoutAvailableSeats extends DomainError {
  public static with(sessionId: string) {
    return new SessionWithoutAvailableSeats(
      `Session: ${sessionId} has no available seats`,
    );
  }
}
