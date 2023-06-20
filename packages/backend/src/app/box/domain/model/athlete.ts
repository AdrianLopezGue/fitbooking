import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { AthleteId } from './athlete-id';
import { UserId } from '../../../user';
import { AthleteRole } from './athlete-role';
import { BoxId } from '../../../box/domain/model/box-id';
import { UserEmail } from '../../../user/domain/model/user-email';

export class Athlete extends AggregateRoot {
  private _id!: AthleteId;
  private _email!: UserEmail;
  private _userId?: UserId;
  private _role!: AthleteRole;
  private _boxId!: BoxId;

  constructor(
    id?: AthleteId,
    email?: UserEmail,
    userId?: UserId,
    role?: AthleteRole,
    boxId?: BoxId,
  ) {
    super();
    this._id = id;
    this._email = email;
    this._userId = userId;
    this._role = role;
    this._boxId = boxId;
  }

  public static fromBoxInvitation(
    id: AthleteId,
    email: UserEmail,
    role: AthleteRole,
    boxId: BoxId,
  ) {
    return new Athlete(id, email, undefined, role, boxId);
  }

  aggregateId(): string {
    return this._id.value;
  }

  get id(): AthleteId {
    return this._id;
  }

  get email(): UserEmail {
    return this._email;
  }

  get userId(): UserId {
    return this._userId;
  }

  get role(): AthleteRole {
    return this._role;
  }

  get boxId(): BoxId {
    return this._boxId;
  }
}
