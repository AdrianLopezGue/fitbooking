import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  name: string;
  assistants: string[];
  maxCapacity: number;
  date: Date;
};

export class SessionWasCreatedEvent extends Event<Payload> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly assistants: string[],
    public readonly maxCapacity: number,
    public readonly date: Date,
  ) {
    super(id, {
      name,
      assistants,
      maxCapacity,
      date,
    });
  }
}
