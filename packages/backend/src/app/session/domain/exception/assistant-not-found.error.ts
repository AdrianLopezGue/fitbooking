import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class AssistantNotFound extends DomainError {
  constructor(cause: string) {
    super(cause);
  }
}
