import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AthleteListDTO } from '@fitbooking/contracts';
import { BOX_FINDER, BoxFinder } from '../service/box-finder.service';
import { GetAthletesByBoxQuery } from './get-athletes-by-box.query';

@QueryHandler(GetAthletesByBoxQuery)
export class GetAthletesByBoxQueryHandler implements IQueryHandler {
  constructor(@Inject(BOX_FINDER) private readonly boxFinder: BoxFinder) {}

  async execute(query: GetAthletesByBoxQuery): Promise<AthleteListDTO> {
    return this.boxFinder.findAthletesByBox(query.boxId);
  }
}
