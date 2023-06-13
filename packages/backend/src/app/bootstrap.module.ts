import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import {
  EVENTSTORE_KEYSTORE_CONNECTION,
  EventStoreModule,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';

import config from './config/config';
import { SessionModule } from './session/infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      isGlobal: true,
      load: [config],
    }),
    CqrsModule,
    EventsModule,
    EventStoreModule.forRoot({
      connection: process.env.EVENTSTORE_URI || '',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {}),
    MongooseModule.forRoot(process.env.KEYSTORE_URI || '', {
      connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
    }),
    SessionModule,
  ],
})
export class BootstrapModule {}