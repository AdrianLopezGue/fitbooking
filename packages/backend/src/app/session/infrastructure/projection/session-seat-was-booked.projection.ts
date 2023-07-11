import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasBookedEvent } from '../../domain';
import { SESSION_PROJECTION, SessionDocument } from './session.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ATHLETE_SESSIONS_BOOKED_PROJECTION,
  AthleteSessionsBookedDocument,
} from './athlete-sessions-booked.schema';

@EventsHandler(SessionSeatWasBookedEvent)
export class SessionSeatWasBookedProjection
  implements IEventHandler<SessionSeatWasBookedEvent>
{
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
    @InjectModel(ATHLETE_SESSIONS_BOOKED_PROJECTION)
    private readonly athleteSessionsBookedProjection: Model<AthleteSessionsBookedDocument>,
  ) {}

  async handle(event: SessionSeatWasBookedEvent) {
    const { aggregateId, assistant, date: dateString } = event;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours() + ':' + date.getMinutes();

    const filter = {
      athleteId: assistant,
      month,
      year,
    };

    const updateSessions = {
      $push: {
        [`sessions.${day}`]: hour,
      },
    };

    await Promise.all([
      this.athleteSessionsBookedProjection.findOneAndUpdate(filter, updateSessions, {
        upsert: true,
        new: true,
      }),
      this.sessionProjection.updateOne(
        { _id: aggregateId },
        {
          $push: {
            assistants: assistant,
          },
        },
      ),
    ]);
  }
}
