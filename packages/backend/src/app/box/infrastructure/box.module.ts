import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers, QueryHandlers } from '../application';
import { Box } from '../domain/model/box';
import { eventTransformers } from './event-transformer/event-transformer';
import {
  ProjectionHandlers,
  BOX_PROJECTION,
  BoxSchema,
  ATHLETE_PROJECTION,
  AthleteSchema,
} from './projection';
import { BoxController } from './controller/box.controller';
import { BoxService } from './service/box.service';
import { BoxProviders } from './box.provider';
import { User } from '../../user/domain/model/user';
import { USER_PROJECTION, UserSchema } from '../../user/infrastructure/projection';

@Module({
  controllers: [BoxController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Box, User], eventTransformers),
    MongooseModule.forFeature([
      {
        name: BOX_PROJECTION,
        schema: BoxSchema,
      },
      {
        name: ATHLETE_PROJECTION,
        schema: AthleteSchema,
      },
      {
        name: USER_PROJECTION,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...ProjectionHandlers,
    ...BoxProviders,
    BoxService,
  ],
})
export class BoxModule {}
