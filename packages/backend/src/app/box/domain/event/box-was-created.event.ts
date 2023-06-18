import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class BoxWasCreatedEvent extends Event {
  constructor(public readonly id: string, public readonly name: string) {
    super(id, {
      name,
    });
  }
}
