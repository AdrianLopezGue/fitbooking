import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(
    @Body() loginDTO: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;

    const isValid = await this.authService.validateUser(email, password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.authService.generateAccessToken(email);
  }
}