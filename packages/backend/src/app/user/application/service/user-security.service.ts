import { Password } from '../../domain/model/password';

export const USER_SECURITY = 'USER_SECURITY';

export interface UserSecurity {
  encodePassword(password: Password): Promise<Password>;
}
