import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BootstrapModule } from './bootstrap.module';

@Module({
  imports: [BootstrapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
