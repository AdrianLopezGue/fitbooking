import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserWasCreatedEvent extends Event {
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
