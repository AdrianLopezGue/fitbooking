import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  SessionDTO,
  SessionFinder,
} from '../../application/service/session-finder.service';
import { SESSION_PROJECTION, SessionDocument } from '../projection/session.schema';

@Injectable()
export class MongoSessionFinder implements SessionFinder {
  constructor(
    @InjectModel(SESSION_PROJECTION)
    private readonly sessionProjection: Model<SessionDocument>,
  ) {}

  find(id: string): Promise<SessionDTO | undefined> {
    return this.sessionProjection.findById(id).exec();
  }

  findByDate(date: Date): Promise<SessionDTO[] | undefined> {
    return this.sessionProjection.find({ date }).exec();
  }
}
