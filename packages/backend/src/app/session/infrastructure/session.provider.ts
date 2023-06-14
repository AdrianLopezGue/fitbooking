import { SESSION_FINDER } from '../application/service/session-finder.service';
import { MongoDBSessionFinder } from './service/session-finder.service';

export const SessionProviders = [
  {
    provide: SESSION_FINDER,
    useClass: MongoDBSessionFinder,
  },
];
