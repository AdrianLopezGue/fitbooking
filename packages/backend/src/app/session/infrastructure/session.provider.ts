import { SESSION_FINDER } from '../application/service/session-finder.service';
import { MongoSessionFinder } from './service/mongo-session-finder.service';

export const SessionProviders = [
  {
    provide: SESSION_FINDER,
    useClass: MongoSessionFinder,
  },
];
