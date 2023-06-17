import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetUserByEmailQuery } from '../user/application/query/get-user-by-email.query';
import { UserDTO } from '../user/application/service/user-finder.service';

@Injectable()
export class AuthService {
  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.queryBus.execute<GetUserByEmailQuery, UserDTO>(
        new GetUserByEmailQuery(email),
      );

      return user && bcrypt.compareSync(password, user.password);
    } catch (e) {
      console.error(`Access error with email ${email}: ${e.message}`);

      return false;
    }
  }

  generateAccessToken(email: string): { access_token: string } {
    const payload = { email: email };

    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS512',
      }),
    };
  }

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hashSync(password, salt);
  }
}
