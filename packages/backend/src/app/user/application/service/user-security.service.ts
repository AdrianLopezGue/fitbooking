export const USER_SECURITY = 'USER_SECURITY';

export interface UserSecurity {
  encodePassword(password: string): Promise<string>;
}
