import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationWasAcceptedEvent } from '../../domain/event/invitation-was-accepted.event';
import { ATHLETE_PROJECTION, AthleteDocument } from './athlete.schema';
import { USER_PROJECTION, UserDocument } from '../../../user/infrastructure/projection';

@EventsHandler(InvitationWasAcceptedEvent)
export class InvitationWasAcceptedEventProjection
  implements IEventHandler<InvitationWasAcceptedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
    @InjectModel(ATHLETE_PROJECTION)
    private readonly athleteProjection: Model<AthleteDocument>,
  ) {}

  async handle(event: InvitationWasAcceptedEvent) {
    const userName = await this.userProjection
      .findById(event.userId)
      .select({ _id: 0, name: 1 })
      .exec();

    await this.athleteProjection.updateOne(
      { _id: event.athleteId },
      {
        userId: event.userId,
        name: userName.name,
        acceptedAt: event.acceptedAt,
      },
    );
  }
}
