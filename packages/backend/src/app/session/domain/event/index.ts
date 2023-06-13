import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionSeatWasBookedEvent } from './session-seat-was-booked.event';

export const eventTransformers = {
  SessionSeatWasBookedEvent: (event: Event<SessionSeatWasBookedEvent>) =>
    new SessionSeatWasBookedEvent(event.payload.id, event.payload.assistant),
};
