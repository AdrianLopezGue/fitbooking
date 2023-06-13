import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class AssistantAlreadyConfirmed extends DomainError {
  public static with(sessionId: string, userId: string) {
    return new AssistantAlreadyConfirmed(
      `Assistant with id ${userId} has already booked the session ${sessionId}`,
    );
  }
}
