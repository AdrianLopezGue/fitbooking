import { SessionSeatWasBookedHandler } from './session-seat-was-booked.handler';
import { SessionSeatWasCancelledHandler } from './session-seat-was-cancelled.handler';

export const EventsHandlers = [SessionSeatWasBookedHandler, SessionSeatWasCancelledHandler];
