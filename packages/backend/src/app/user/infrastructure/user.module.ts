import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../domain/model/user';
import { eventTransformers } from './event-transformer/event-transformer';
import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectionHandlers, USER_PROJECTION, UserSchema } from './projection';
import { CommandHandlers, QueryHandlers } from '../application';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([User], eventTransformers),
    MongooseModule.forFeature([
      {
        name: USER_PROJECTION,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [...CommandHandlers, ...QueryHandlers, ...ProjectionHandlers],
})
export class UserModule {}
