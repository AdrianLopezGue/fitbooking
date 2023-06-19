import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class AdminAthleteWasCreatedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly boxId: string,
    public readonly role: string,
  ) {
    super(id, {
      userId,
      boxId,
      role,
    });
  }
}
