import { USER_FINDER } from '../application/service/user-finder.service';
import { MongoDBUserFinder } from './service/user-finder.service';

export const UserProviders = [
  {
    provide: USER_FINDER,
    useClass: MongoDBUserFinder,
  },
];
