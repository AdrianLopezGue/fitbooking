import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  name: string;
  boxId: string;
  assistants: string[];
  maxCapacity: number;
  date: Date;
};

export class SessionWasCreatedEvent extends Event<Payload> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly boxId: string,
    public readonly assistants: string[],
    public readonly maxCapacity: number,
    public readonly date: Date,
  ) {
    super(id, {
      name,
      boxId,
      assistants,
      maxCapacity,
      date,
    });
  }
}
