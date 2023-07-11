import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasCancelledEvent } from '../../domain';
import { SESSION_PROJECTION, SessionDocument } from './session.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ATHLETE_SESSIONS_BOOKED_PROJECTION,
  AthleteSessionsBookedDocument,
} from './athlete-sessions-booked.schema';

@EventsHandler(SessionSeatWasCancelledEvent)
export class SessionSeatWasCancelledProjection
  implements IEventHandler<SessionSeatWasCancelledEvent>
{
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
    @InjectModel(ATHLETE_SESSIONS_BOOKED_PROJECTION)
    private readonly athleteSessionsBookedProjection: Model<AthleteSessionsBookedDocument>,
  ) {}

  async handle(event: SessionSeatWasCancelledEvent) {
    const { aggregateId, assistant, date: dateString } = event;
    const date = new Date(dateString);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours() + ':' + date.getMinutes();

    await this.athleteSessionsBookedProjection.updateOne(
      {
        athleteId: assistant,
        month,
        year,
      },
      {
        $pull: {
          [`sessions.${day}`]: { $in: [hour] },
        },
      },
    );

    await this.sessionProjection.updateOne(
      { _id: aggregateId },
      {
        $pull: {
          assistants: assistant,
        },
      },
    );
  }
}
