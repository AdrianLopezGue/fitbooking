import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBoxDTO } from './dtos/create-box.dto';
import { BoxWasCreatedEvent } from '../../domain/event/box-was-created.event';
import { AdminAthleteWasCreatedEvent } from '../../domain/event/admin-athlete-was-created.event';
import { CreateAdminAthleteDTO } from './dtos/create-admin-athlete.dto';
import { AthleteWasInvitedEvent } from '../../domain/event/athlete-was-invited.event';
import { InviteAthleteDTO } from './dtos/invite-athlete.dto';
import { InvitationWasAcceptedEvent } from '../../domain/event/invitation-was-accepted.event';
import { AcceptInvitationDTO } from './dtos/accept-invitation.dto';

export const eventTransformers = {
  BoxWasCreatedEvent: (event: Event<CreateBoxDTO>) =>
    new BoxWasCreatedEvent(event.aggregateId, event.payload.name, event.payload.location),
  AdminAthleteWasCreatedEvent: (event: Event<CreateAdminAthleteDTO>) =>
    new AdminAthleteWasCreatedEvent(
      event.aggregateId,
      event.payload.athleteId,
      event.payload.email,
      event.payload.userId,
      event.payload.boxId,
      event.payload.role,
      event.payload.acceptedAt,
      event.payload.invitedAt,
    ),
  AthleteWasInvitedEvent: (event: Event<InviteAthleteDTO>) =>
    new AthleteWasInvitedEvent(
      event.aggregateId,
      event.payload.athleteId,
      event.payload.email,
      event.payload.boxId,
      event.payload.role,
      event.payload.invitedAt,
    ),
  InvitationWasAcceptedEvent: (event: Event<AcceptInvitationDTO>) =>
    new InvitationWasAcceptedEvent(
      event.aggregateId,
      event.payload.athleteId,
      event.payload.email,
      event.payload.userId,
      event.payload.boxId,
      event.payload.role,
      event.payload.acceptedAt,
    ),
};
