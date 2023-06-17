import { User } from '../model/user';
import { UserId } from '../model/user-id';

export const USERS = 'USERS';

export interface UserRepository {
  find(id: UserId): Promise<User | undefined>;
  save(user: User): Promise<void>;
  delete(entity: User): Promise<void>;
}
