import { UserDTO } from '@fitbooking/contracts';
import { UserFinder } from '../../application/service/user-finder.service';
import { User } from '../../domain/model/user';

export class InMemoryUserFinder implements UserFinder {
  constructor(public users: User[] = []) {}

  find(id: string): Promise<UserDTO | undefined> {
    const userFound = this.users.find((user: User) => user.id.value === id);

    return userFound ? Promise.resolve(this.mapUserToDTO(userFound)) : undefined;
  }

  findByEmail(email: string): Promise<UserDTO> {
    const userFound = this.users.find((user: User) => user.email.value === email);

    return userFound ? Promise.resolve(this.mapUserToDTO(userFound)) : undefined;
  }

  private mapUserToDTO(user: User): UserDTO {
    return {
      _id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
    };
  }
}
