import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserDTO,
  UserFinder,
} from '../../application/service/user-finder.service';
import { USER_PROJECTION, UserDocument } from '../projection/user.schema';

@Injectable()
export class MongoDBUserFinder implements UserFinder {
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>,
  ) {}

  find(id: string): Promise<UserDTO | undefined> {
    return this.userProjection.findById(id).exec();
  }
}
