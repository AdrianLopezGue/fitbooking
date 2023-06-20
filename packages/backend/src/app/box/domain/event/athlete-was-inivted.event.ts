import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class AthleteWasInvitedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly boxId: string,
    public readonly role: string,
  ) {
    super(id, {
      email,
      boxId,
      role,
    });
  }
}
