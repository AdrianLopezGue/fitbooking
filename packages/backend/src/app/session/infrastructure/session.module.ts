import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Session } from '../domain/model/session';
import { eventTransformers } from './event-transformer/event-transformer';
import { MongooseModule } from '@nestjs/mongoose';
import { commandHandlers, queryHandlers } from '../application';
import { SessionService } from './service/session.service';
import { SessionController } from './controller/session.controller';

@Module({
  controllers: [SessionController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Session], eventTransformers),
    MongooseModule.forFeature(), //todo
  ],
  providers: [...commandHandlers, ...queryHandlers, SessionService],
})
export class SessionModule {}
