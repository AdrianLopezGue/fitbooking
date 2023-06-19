import { BOX_FINDER } from '../application/service/box-finder.service';
import { MongoBoxFinder } from './service/mongo-box-finder.service';

export const BoxProviders = [
  {
    provide: BOX_FINDER,
    useClass: MongoBoxFinder,
  },
];
