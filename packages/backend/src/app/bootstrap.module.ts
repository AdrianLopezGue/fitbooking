import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EVENTSTORE_KEYSTORE_CONNECTION,
  EventStoreModule,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';

import config from './config/config';
import { SessionModule } from './session/infrastructure';
import { UserModule } from './user/infrastructure/user.module';
import { AuthModule } from './auth/auth.module';

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
    EventStoreModule.forRoot({
      connection: process.env.EVENTSTORE_URI || '',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {}),
    MongooseModule.forRoot(process.env.KEYSTORE_URI || '', {
      connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
    }),
    SessionModule,
    UserModule,
    AuthModule,
  ],
})
export class BootstrapModule {}
