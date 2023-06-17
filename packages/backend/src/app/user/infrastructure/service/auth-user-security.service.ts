import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class AuthUserSecurity implements AuthUserSecurity, OnModuleInit {
  private authService: AuthService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false });
  }

  async encodePassword(password: string): Promise<string> {
    return await this.authService.encodePassword(password);
  }
}
