import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserWasCreatedEvent } from '../../domain/event/user-was-created.event';
import { CreateUserDTO } from './dtos/create-user.dto';

export const eventTransformers = {
  UserWasCreatedEvent: (event: Event<CreateUserDTO>) =>
    new UserWasCreatedEvent(
      event.aggregateId,
      event.payload.name,
      event.payload.email,
      event.payload.password,
    ),
};
