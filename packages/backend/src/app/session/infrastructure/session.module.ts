import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Session } from '../domain/model/session';
import { eventTransformers } from './event-transformer/event-transformer';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers, QueryHandlers } from '../application';
import { SessionService } from './service/session.service';
import { SessionController } from './controller/session.controller';
import { SessionProviders } from './session.provider';
import { ProjectionHandlers, SESSION_PROJECTION, SessionSchema } from './projection';
import { WebsocketSessionGateway } from './websocket/session.gateway';
import { EventsHandlers } from './websocket';

@Module({
  controllers: [SessionController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Session], eventTransformers),
    MongooseModule.forFeature([
      {
        name: SESSION_PROJECTION,
        schema: SessionSchema,
      },
    ]),
  ],
  providers: [
    ...CommandHandlers,
    ...EventsHandlers,
    ...QueryHandlers,
    ...ProjectionHandlers,
    ...SessionProviders,
    WebsocketSessionGateway,
    SessionService,
  ],
})
export class SessionModule {}
