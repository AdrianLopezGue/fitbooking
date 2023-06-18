import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BoxWasCreatedEvent } from '../../domain/event/box-was-created.event';
import { BOX_PROJECTION, BoxDocument } from './box.schema';

@EventsHandler(BoxWasCreatedEvent)
export class BoxWasCreatedProjection implements IEventHandler<BoxWasCreatedEvent> {
  constructor(
    @InjectModel(BOX_PROJECTION)
    private readonly boxProjection: Model<BoxDocument>,
  ) {}

  async handle(event: BoxWasCreatedEvent) {
    const box = new this.boxProjection({
      _id: event.aggregateId,
      ...event.payload,
    });
    await box.save();
  }
}
