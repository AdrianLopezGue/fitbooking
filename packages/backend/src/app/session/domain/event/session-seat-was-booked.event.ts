import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionSeatWasBookedEvent extends Event {
  constructor(public readonly id: string, public readonly userId: string) {
    super(id, {
      _id: id,
      assistant: userId,
    });
  }
}
