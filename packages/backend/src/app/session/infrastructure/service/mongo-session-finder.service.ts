import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SessionFinder } from '../../application/service/session-finder.service';
import { SESSION_PROJECTION, SessionDocument } from '../projection/session.schema';
import { SessionDTO } from '@fitbooking/contracts';

@Injectable()
export class MongoSessionFinder implements SessionFinder {
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
  ) {}

  find(id: string): Promise<SessionDTO | undefined> {
    return this.sessionProjection.findById(id).exec();
  }

  findByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[] | undefined> {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    return this.sessionProjection.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
      boxId,
    }).exec();
  }
}
