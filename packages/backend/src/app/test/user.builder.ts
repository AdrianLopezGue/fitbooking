import { UserId } from '../user';
import { Password } from '../user/domain/model/password';

import { User } from '../user/domain/model/user';
import { UserEmail } from '../user/domain/model/user-email';
import { UserName } from '../user/domain/model/user-name';

export class UserBuilder {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  public constructor() {
    this.id = '0f6e8a59-7429-4930-9d38-3294552d2e40';
    this.name = 'Defaul name';
    this.email = 'test@test.com';
    this.password = 'Ultra secret password';
  }

  build(): User {
    return new User(
      UserId.from(this.id),
      UserName.from(this.name),
      UserEmail.from(this.email),
      Password.from(this.password),
    );
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withEmail(email: string) {
    this.email = email;
    return this;
  }
}
