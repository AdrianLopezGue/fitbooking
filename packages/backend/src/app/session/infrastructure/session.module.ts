import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../../auth/auth.guard';
import { CommandHandlers, QueryHandlers } from '../application';
import { Session } from '../domain/model/session';
import { SessionController } from './controller/session.controller';
import { EventsHandlers } from './event-handler';
import { eventTransformers } from './event-transformer/event-transformer';
import { ProjectionHandlers, SESSION_PROJECTION, SessionSchema } from './projection';
import {
  ATHLETE_SESSIONS_BOOKED_PROJECTION,
  AthleteSessionsBookedDocumentSchema,
} from './projection/athlete-sessions-booked.schema';
import { SessionService } from './service/session.service';
import { SessionProviders } from './session.provider';
import { WebsocketSessionGateway } from './websocket/session.gateway';

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
      {
        name: ATHLETE_SESSIONS_BOOKED_PROJECTION,
        schema: AthleteSessionsBookedDocumentSchema,
      },
    ]),
  ],
  providers: [
    JwtService,
    ...CommandHandlers,
    ...EventsHandlers,
    ...QueryHandlers,
    ...ProjectionHandlers,
    ...SessionProviders,
    WebsocketSessionGateway,
    SessionService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class SessionModule {}
