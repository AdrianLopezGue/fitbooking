import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BoxDTO, BoxListDTO } from '@fitbooking/contracts';
import { BoxFinder } from '../../application/service/box-finder.service';
import {
  ATHLETE_PROJECTION,
  AthleteDocument,
  BOX_PROJECTION,
  BoxDocument,
} from '../projection';

@Injectable()
export class MongoBoxFinder implements BoxFinder {
  constructor(
    @InjectModel(BOX_PROJECTION)
    private readonly boxProjection: Model<BoxDocument>,
    @InjectModel(ATHLETE_PROJECTION)
    private readonly athleteProjection: Model<AthleteDocument>,
  ) {}

  async find(id: string): Promise<BoxDTO | undefined> {
    const boxProjection = await this.boxProjection.findById(id).exec();

    if (!boxProjection) {
      return undefined;
    }

    const atheletesProjection = await this.athleteProjection
      .find({
        boxId: boxProjection._id,
      })
      .exec();

    return {
      _id: boxProjection._id,
      name: boxProjection.name,
      athletes: atheletesProjection.map(({ _id, userId, role }) => ({
        _id,
        userId,
        role,
      })),
    };
  }

  async findByEmail(email: string): Promise<BoxListDTO> {
    const atheletesProjection = await this.athleteProjection.find({ email }).exec();

    if (!atheletesProjection) {
      return [];
    }

    const boxesIds = atheletesProjection.map(projection => projection.boxId);

    const boxProjections = await this.boxProjection
      .find({ _id: { $in: boxesIds } })
      .exec();

    return boxProjections.map(projection => ({
      _id: projection._id,
      name: projection.name,
    }));
  }
}
