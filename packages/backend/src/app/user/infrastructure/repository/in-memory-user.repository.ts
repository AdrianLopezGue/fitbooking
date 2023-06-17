import { User } from '../../domain/model/user';
import { UserEmail } from '../../domain/model/user-email';
import { UserId } from '../../domain/model/user-id';
import { UserRepository } from '../../domain/service/user.repository';

export class InMemoryUserRepository implements UserRepository {
  constructor(public users: User[] = []) {}

  async find(id: UserId): Promise<User | undefined> {
    return this.users.find((user: User) => user.id.equals(id));
  }

  async findByEmail(email: UserEmail): Promise<User | undefined> {
    return this.users.find((user: User) => user.email.equals(email));
  }

  async save(user: User): Promise<void> {
    const userFound = await this.find(user.id);

    if (userFound) {
      this.users = this.users.filter(s => !s.id.equals(user.id));
    }

    this.users.push(user);
  }

  delete(entity: User): Promise<void> {
    this.users = this.users.filter(user => !user.id.equals(entity.id));
    return Promise.resolve();
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}
