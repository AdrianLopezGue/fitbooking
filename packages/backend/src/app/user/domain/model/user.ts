import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId } from './user-id';
import { UserName } from './user-name';
import { UserWasCreatedEvent } from '../event/user-was-created.event';
import { UserEmail } from './user-email';
import { Password } from './password';

export class User extends AggregateRoot {
  private _id!: UserId;
  private _name!: UserName;
  private _email!: UserEmail;
  private _password!: Password;

  constructor(id?: UserId, name?: UserName, email?: UserEmail, password?: Password) {
    super();
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public static add(name: UserName, email: UserEmail, password: Password): User {
    const user = new User();

    const event = new UserWasCreatedEvent(
      UserId.generate().value,
      name.value,
      email.value,
      password.value,
    );

    user.apply(event);
    return user;
  }

  private onUserWasCreatedEvent(event: UserWasCreatedEvent): void {
    this._id = UserId.from(event.id);
    this._name = UserName.from(event.name);
    this._email = UserEmail.from(event.email);
    this._password = Password.from(event.password);
  }

  aggregateId(): string {
    return this._id.value;
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName {
    return this._name;
  }

  get email(): UserEmail {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }
}
