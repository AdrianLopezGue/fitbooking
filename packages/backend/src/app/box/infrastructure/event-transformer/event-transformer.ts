import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBoxDTO } from './dtos/create-box.dto';
import { BoxWasCreatedEvent } from '../../domain/event/box-was-created.event';

export const eventTransformers = {
  BoxWasCreatedEvent: (event: Event<CreateBoxDTO>) =>
    new BoxWasCreatedEvent(event.aggregateId, event.payload.name),
};
