import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from '../../../auth/auth.service';
import { Password } from '../../domain/model/password';

@Injectable()
export class AuthUserSecurity implements AuthUserSecurity, OnModuleInit {
  private authService: AuthService;

  constructor(private moduleReference: ModuleRef) {}

  onModuleInit() {
    this.authService = this.moduleReference.get(AuthService, { strict: false });
  }

  async encodePassword(password: Password): Promise<Password> {
    return await this.authService.encodePassword(password);
  }
}
