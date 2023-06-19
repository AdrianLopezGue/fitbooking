import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { AthleteId } from './athlete-id';
import { UserId } from '../../../user';
import { AthleteRole } from './athlete-role';
import { AthleteWasCreatedEvent } from '../event/athlete-was-created.event';
import { BoxId } from '../../../box/domain/model/box-id';

export class Athlete extends AggregateRoot {
  private _id!: AthleteId;
  private _userId!: UserId;
  private _role!: AthleteRole;
  private _boxId!: BoxId;

  constructor(id?: AthleteId, userId?: UserId, role?: AthleteRole, boxId?: BoxId) {
    super();
    this._id = id;
    this._userId = userId;
    this._role = role;
    this._boxId = boxId;
  }

  public static add(userId: UserId, role: AthleteRole, boxId: BoxId): Athlete {
    const athlete = new Athlete();

    const event = new AthleteWasCreatedEvent(
      AthleteId.generate().value,
      userId.value,
      role.value,
      boxId.value,
    );

    athlete.apply(event);
    return athlete;
  }

  private onAthleteWasCreatedEvent(event: AthleteWasCreatedEvent): void {
    this._id = AthleteId.from(event.id);
    this._userId = UserId.from(event.userId);
    this._role = AthleteRole.from(event.role);
    this._boxId = BoxId.from(event.boxId);
  }

  aggregateId(): string {
    return this._id.value;
  }

  get id(): AthleteId {
    return this._id;
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
