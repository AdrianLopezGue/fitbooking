import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDTO } from '@fitbooking/contracts';
import { USER_FINDER, UserFinder } from '../service/user-finder.service';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler {
  constructor(@Inject(USER_FINDER) private readonly userFinder: UserFinder) {}

  async execute(query: GetUserByEmailQuery): Promise<UserDTO> {
    return this.userFinder.findByEmail(query.email);
  }
}
