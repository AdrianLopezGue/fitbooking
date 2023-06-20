import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  name: string;
};
export class BoxWasCreatedEvent extends Event<Payload> {
  constructor(public readonly id: string, public readonly name: string) {
    super(id, {
      name,
    });
  }
}
