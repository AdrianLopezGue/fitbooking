import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class AssistantAlreadyConfirmed extends DomainError {
  public static with(sessionId: string, athleteId: string) {
    return new AssistantAlreadyConfirmed(
      `Assistant with id ${athleteId} has already booked the session ${sessionId}`,
    );
  }
}
