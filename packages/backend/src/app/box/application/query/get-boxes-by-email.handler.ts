import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BoxListDTO } from '@fitbooking/contracts';
import { BOX_FINDER, BoxFinder } from '../service/box-finder.service';
import { GetBoxesByEmailQuery } from './get-boxes-by-email.query';

@QueryHandler(GetBoxesByEmailQuery)
export class GetBoxesByEmailQueryHandler implements IQueryHandler {
  constructor(@Inject(BOX_FINDER) private readonly boxFinder: BoxFinder) {}

  async execute(query: GetBoxesByEmailQuery): Promise<BoxListDTO> {
    return this.boxFinder.findByEmail(query.email);
  }
}
