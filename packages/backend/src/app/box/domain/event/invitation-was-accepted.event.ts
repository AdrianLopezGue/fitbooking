import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

type Payload = {
  athleteId: string;
  email: string;
  userId: string;
  boxId: string;
  role: string;
};

export class InvitationWasAcceptedEvent extends Event<Payload> {
  constructor(
    public readonly id: string,
    public readonly athleteId: string,
    public readonly email: string,
    public readonly userId: string,
    public readonly boxId: string,
    public readonly role: string,
  ) {
    super(id, {
      athleteId,
      email,
      userId,
      boxId,
      role,
    });
  }
}
