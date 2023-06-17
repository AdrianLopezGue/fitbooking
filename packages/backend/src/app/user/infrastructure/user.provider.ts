import { USER_FINDER } from '../application/service/user-finder.service';
import { USER_SECURITY } from '../application/service/user-security.service';
import { AuthUserSecurity } from './service/auth-user-security.service';
import { MongoDBUserFinder } from './service/user-finder.service';

export const UserProviders = [
  {
    provide: USER_FINDER,
    useClass: MongoDBUserFinder,
  },
  {
    provide: USER_SECURITY,
    useClass: AuthUserSecurity,
  },
];
