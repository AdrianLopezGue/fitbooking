import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { USER_FINDER, UserDTO, UserFinder } from '../service/user-finder.service';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler {
  constructor(@Inject(USER_FINDER) private readonly userFinder: UserFinder) {}

  async execute(query: GetUserByIdQuery): Promise<UserDTO> {
    return this.userFinder.find(query.id);
  }
}
