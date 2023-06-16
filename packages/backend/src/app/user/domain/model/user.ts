import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId } from './user-id';
import { UserName } from './user-name';
import { UserWasCreatedEvent } from '../event/user-was-created.event';

export class User extends AggregateRoot {
  private _id!: UserId;
  private _name!: UserName;

  constructor(id?: UserId, name?: UserName) {
    super();
    this._id = id;
    this._name = name;
  }

  public static add(name: UserName): User {
    const user = new User();

    const event = new UserWasCreatedEvent(UserId.generate().value, name.value);

    user.apply(event);
    return user;
  }

  private onUserWasCreatedEvent(event: UserWasCreatedEvent): void {
    this._id = UserId.fromString(event.id);
    this._name = UserName.from(event.name);
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
}
