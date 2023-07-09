import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  name: string;
  location: string;
};
export class BoxWasCreatedEvent extends Event<Payload> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly location: string,
  ) {
    super(id, {
      name,
      location,
    });
  }
}
