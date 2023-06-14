import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { BookSeatDTO } from './dtos/book-seat.dto';
import { CreateSessionDTO } from './dtos/create-session.dto';
import { CancelSeatDTO } from './dtos/cancel-seat.dto';
import {
  SessionSeatWasBookedEvent,
  SessionSeatWasCancelledEvent,
  SessionWasCreatedEvent,
} from '../../domain';

export const eventTransformers = {
  SessionSeatWasBookedEvent: (event: Event<BookSeatDTO>) =>
    new SessionSeatWasBookedEvent(event.aggregateId, event.payload.assistant),
  SessionWasCreatedEvent: (event: Event<CreateSessionDTO>) =>
    new SessionWasCreatedEvent(
      event.aggregateId,
      event.payload.assistants,
      event.payload.maxCapacity,
    ),
  SessionSeatWasCancelledEvent: (event: Event<CancelSeatDTO>) =>
    new SessionSeatWasCancelledEvent(event.aggregateId, event.payload.assistant),
};
