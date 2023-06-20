import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdminAthleteWasCreatedEvent } from '../../domain/event/admin-athlete-was-created.event';
import { ATHLETE_PROJECTION, AthleteDocument } from './athlete.schema';

@EventsHandler(AdminAthleteWasCreatedEvent)
export class AdminAthleteWasCreatedProjection
  implements IEventHandler<AdminAthleteWasCreatedEvent>
{
  constructor(
    @InjectModel(ATHLETE_PROJECTION)
    private readonly athleteProjection: Model<AthleteDocument>,
  ) {}

  async handle(event: AdminAthleteWasCreatedEvent) {
    const athlete = new this.athleteProjection({
      _id: event.athleteId,
      ...event.payload,
    });
    await athlete.save();
  }
}
