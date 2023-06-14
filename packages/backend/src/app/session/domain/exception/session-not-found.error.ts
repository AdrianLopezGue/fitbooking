import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionNotFound extends DomainError {
  public static with(sessionId: string) {
    return new SessionNotFound(`Session with id: ${sessionId} does not exist`);
  }
}
