import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BoxFinder, BoxDTO, BOX_FINDER } from '../service/box-finder.service';
import { GetBoxByIdQuery } from './get-box-by-id.query';

@QueryHandler(GetBoxByIdQuery)
export class GetBoxByIdQueryHandler implements IQueryHandler {
  constructor(@Inject(BOX_FINDER) private readonly boxFinder: BoxFinder) {}

  async execute(query: GetBoxByIdQuery): Promise<BoxDTO> {
    return this.boxFinder.find(query.id);
  }
}
