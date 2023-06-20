import { AdminAthleteWasCreatedProjection } from './admin-athlete-was-created.projection';
import { AthleteWasInvitedProjection } from './athlete-was-invited.projection';
import { BoxWasCreatedProjection } from './box-was-created.projection';
export * from './box.schema';
export * from './athlete.schema';

export const ProjectionHandlers = [
  BoxWasCreatedProjection,
  AdminAthleteWasCreatedProjection,
  AthleteWasInvitedProjection,
];
