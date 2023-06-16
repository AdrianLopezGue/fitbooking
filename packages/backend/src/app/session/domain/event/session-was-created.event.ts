import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionWasCreatedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly assistants: string[],
    public readonly maxCapacity: number,
  ) {
    super(id, {
      name,
      assistants,
      maxCapacity,
    });
  }
}
