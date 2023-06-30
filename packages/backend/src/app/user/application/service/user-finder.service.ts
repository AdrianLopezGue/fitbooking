import { UserDTO } from '@fitbooking/contracts';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  find(id: string): Promise<UserDTO | undefined>;
  findByEmail(email: string): Promise<UserDTO | undefined>;
}
