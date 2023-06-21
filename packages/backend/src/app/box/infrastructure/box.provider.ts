import { BOX_FINDER } from '../application/service/box-finder.service';
import { MongoBoxFinder } from './service/mongo-box-finder.service';
import { MongoDBUserFinder } from '../../user/infrastructure/service/user-finder.service';
import { USER_FINDER } from '../../user/application/service/user-finder.service';

export const BoxProviders = [
  {
    provide: BOX_FINDER,
    useClass: MongoBoxFinder,
  },
  {
    provide: USER_FINDER,
    useClass: MongoDBUserFinder,
  },
];
