import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationWasAcceptedEvent } from '../../domain/event/invitation-was-accepted.event';
import { ATHLETE_PROJECTION, AthleteDocument } from './athlete.schema';

@EventsHandler(InvitationWasAcceptedEvent)
export class InvitationWasAcceptedEventProjection
  implements IEventHandler<InvitationWasAcceptedEvent>
{
  constructor(
    @InjectModel(ATHLETE_PROJECTION)
    private readonly athleteProjection: Model<AthleteDocument>,
  ) {}

  async handle(event: InvitationWasAcceptedEvent) {
    await this.athleteProjection.updateOne(
      { _id: event.athleteId },
      {
        userId: event.userId,
      },
    );
  }
}
