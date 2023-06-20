import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ATHLETE_PROJECTION, AthleteDocument } from './athlete.schema';
import { AthleteWasInvitedEvent } from '../../domain/event/athlete-was-inivted.event';

@EventsHandler(AthleteWasInvitedEvent)
export class AthleteWasInvitedProjection
  implements IEventHandler<AthleteWasInvitedEvent>
{
  constructor(
    @InjectModel(ATHLETE_PROJECTION)
    private readonly athleteProjection: Model<AthleteDocument>,
  ) {}

  async handle(event: AthleteWasInvitedEvent) {
    const athlete = new this.athleteProjection({
      _id: event.athleteId,
      ...event.payload,
    });
    await athlete.save();
  }
}
