import { SessionSeatWasBookedProjection } from './session-seat-was-booked.projection';
import { SessionSeatWasCancelledProjection } from './session-seat-was-cancelled.projection';
import { SessionWasCreatedProjection } from './session-was-created.projection';
export * from './session.schema';

export const ProjectionHandlers = [
  SessionWasCreatedProjection,
  SessionSeatWasBookedProjection,
  SessionSeatWasCancelledProjection,
];
