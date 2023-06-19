import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBoxDTO } from './dtos/create-box.dto';
import { BoxWasCreatedEvent } from '../../domain/event/box-was-created.event';
import { AdminAthleteWasCreatedEvent } from '../../domain/event/admin-athlete-was-created.event';
import { CreateAdminAthleteDTO } from './dtos/create-admin-athlete.dto';

export const eventTransformers = {
  BoxWasCreatedEvent: (event: Event<CreateBoxDTO>) =>
    new BoxWasCreatedEvent(event.aggregateId, event.payload.name),
  AdminAthleteWasCreatedEvent: (event: Event<CreateAdminAthleteDTO>) =>
    new AdminAthleteWasCreatedEvent(
      event.aggregateId,
      event.payload.userId,
      event.payload.boxId,
      event.payload.role,
    ),
};
