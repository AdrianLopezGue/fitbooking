import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasBookedEvent } from '../../domain';
import { SESSION_PROJECTION, SessionDocument } from './session.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@EventsHandler(SessionSeatWasBookedEvent)
export class SessionSeatWasBookedProjection
  implements IEventHandler<SessionSeatWasBookedEvent>
{
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
  ) {}

  async handle(event: SessionSeatWasBookedEvent) {
    await this.sessionProjection.updateOne(
      { _id: event.aggregateId },
      {
        $push: {
          assistants: event.assistant,
        },
      },
    );
  }
}
