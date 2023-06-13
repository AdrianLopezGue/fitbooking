import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionSeatWasBookedEvent } from '../../domain/event/session-seat-was-booked.event';
import { BookSeatDTO } from './dtos/book-seat.dto';
import { SessionWasCreatedEvent } from '../../domain/event/session-was-created.event';
import { CreateSessionDTO } from './dtos/create-session.dto';

export const eventTransformers = {
  SessionSeatWasBookedEvent: (event: Event<BookSeatDTO>) =>
    new SessionSeatWasBookedEvent(event.payload._id, event.payload.assistant),
  SessionWasCreatedEvent: (event: Event<CreateSessionDTO>) =>
    new SessionWasCreatedEvent(
      event.payload._id,
      event.payload.assistants,
      event.payload.maxCapacity,
    ),
};
