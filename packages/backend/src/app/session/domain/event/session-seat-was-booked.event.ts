import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class SessionSeatWasBookedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly assistant: string,
    public readonly date: Date,
  ) {
    super(id, {
      assistant,
      date,
    });
  }
}
