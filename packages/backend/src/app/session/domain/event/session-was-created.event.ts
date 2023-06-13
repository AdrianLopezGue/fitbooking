import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionWasCreatedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly assistants: string[],
    public readonly maxCapacity: number,
  ) {
    super(id, {
      assistants,
      maxCapacity,
    });
  }
}
