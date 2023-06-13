import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionSeatWasBookedEvent } from '../../domain/event/session-seat-was-booked.event';
import { BookSeatDTO } from './dtos/book-seat.dto';

export const eventTransformers = {
  SessionSeatWasBookedEvent: (event: Event<BookSeatDTO>) =>
    new SessionSeatWasBookedEvent(event.payload._id, event.payload.assistant),
};
