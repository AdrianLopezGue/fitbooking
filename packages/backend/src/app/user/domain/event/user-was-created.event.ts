import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  name: string;
  email: string;
  password: string;
};

export class UserWasCreatedEvent extends Event<Payload> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super(id, {
      name,
      email,
      password,
    });
  }
}
