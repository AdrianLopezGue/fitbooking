import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SessionFinder } from '../../application/service/session-finder.service';
import { SESSION_PROJECTION, SessionDocument } from '../projection/session.schema';
import { SessionDTO, SessionsBookedDTO } from '@fitbooking/contracts';
import {
  ATHLETE_SESSIONS_BOOKED_PROJECTION,
  AthleteSessionsBookedDocument,
} from '../projection/athlete-sessions-booked.schema';

@Injectable()
export class MongoSessionFinder implements SessionFinder {
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
    @InjectModel(ATHLETE_SESSIONS_BOOKED_PROJECTION)
    private readonly athleteSessionsBookedProjection: Model<AthleteSessionsBookedDocument>,
  ) {}

  find(id: string): Promise<SessionDTO | undefined> {
    return this.sessionProjection.findById(id).exec();
  }

  findByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[] | undefined> {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    return this.sessionProjection
      .find({
        date: {
          $gte: startDate,
          $lt: endDate,
        },
        boxId,
      })
      .exec();
  }

  async findByAthleteAndDate(
    athleteId: string,
    month: number,
    year: number,
  ): Promise<SessionsBookedDTO> {
    const document = await this.athleteSessionsBookedProjection
      .findOne({
        athleteId,
        month,
        year,
      })
      .exec();

    return document.sessions;
  }
}
