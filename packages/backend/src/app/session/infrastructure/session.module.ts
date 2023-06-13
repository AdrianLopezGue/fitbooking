import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Session } from '../domain/model/session';
import { eventTransformers } from './event-transformer/event-transformer';
import { MongooseModule } from '@nestjs/mongoose';
import { commandHandlers, queryHandlers } from '../application';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Session], eventTransformers),
    MongooseModule.forFeature(), //todo
  ],
  providers: [...commandHandlers, ...queryHandlers],
})
export class SessionModule {}
