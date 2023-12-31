import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  athleteId: string;
  email: string;
  boxId: string;
  role: string;
  invitedAt: Date;
};

export class AthleteWasInvitedEvent extends Event<Payload> {
  constructor(
    public readonly id: string,
    public readonly athleteId: string,
    public readonly email: string,
    public readonly boxId: string,
    public readonly role: string,
    public readonly invitedAt: Date,
  ) {
    super(id, {
      athleteId,
      email,
      boxId,
      role,
      invitedAt,
    });
  }
}
