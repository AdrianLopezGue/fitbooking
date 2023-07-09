import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdminAthleteWasCreatedEvent } from '../../domain/event/admin-athlete-was-created.event';
import { ATHLETE_PROJECTION, AthleteDocument } from './athlete.schema';
import { USER_PROJECTION, UserDocument } from '../../../user/infrastructure/projection';

@EventsHandler(AdminAthleteWasCreatedEvent)
export class AdminAthleteWasCreatedProjection
  implements IEventHandler<AdminAthleteWasCreatedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
    @InjectModel(ATHLETE_PROJECTION)
    private readonly athleteProjection: Model<AthleteDocument>,
  ) {}

  async handle(event: AdminAthleteWasCreatedEvent) {
    const userName = await this.userProjection
      .findById(event.userId)
      .select({ _id: 0, name: 1 })
      .exec();

    const athlete = new this.athleteProjection({
      _id: event.athleteId,
      name: userName.name,
      ...event.payload,
    });
    await athlete.save();
  }
}
