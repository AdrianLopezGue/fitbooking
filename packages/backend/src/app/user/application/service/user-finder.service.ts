export const USER_FINDER = 'USER_FINDER';

export type UserDTO = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export interface UserFinder {
  find(id: string): Promise<UserDTO | undefined>;
  findByEmail(email: string): Promise<UserDTO | undefined>;
}
