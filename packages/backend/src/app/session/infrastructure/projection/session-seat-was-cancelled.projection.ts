import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasCancelledEvent } from '../../domain';
import { SESSION_PROJECTION, SessionDocument } from './session.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@EventsHandler(SessionSeatWasCancelledEvent)
export class SessionSeatWasCancelledProjection
  implements IEventHandler<SessionSeatWasCancelledEvent>
{
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
  ) {}

  async handle(event: SessionSeatWasCancelledEvent) {
    this.sessionProjection.findByIdAndUpdate(event.aggregateId, {
      $pullAll: {
        assistants: event.assistant,
      },
    });
  }
}
