import { Module } from '@nestjs/common';

import { BootstrapModule } from './bootstrap.module';

@Module({
  imports: [BootstrapModule],
})
export class AppModule {}
