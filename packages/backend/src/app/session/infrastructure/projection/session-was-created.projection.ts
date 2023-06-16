import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SessionWasCreatedEvent } from '../../domain/event/session-was-created.event';
import { SESSION_PROJECTION, SessionDocument } from './session.schema';

@EventsHandler(SessionWasCreatedEvent)
export class SessionWasCreatedProjection
  implements IEventHandler<SessionWasCreatedEvent>
{
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
  ) {}

  async handle(event: SessionWasCreatedEvent) {
    const session = new this.sessionProjection({ _id: event.aggregateId, ...event.payload });
    await session.save();
  }
}
