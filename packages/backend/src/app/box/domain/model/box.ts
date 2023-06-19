import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { BoxId } from './box-id';
import { BoxName } from './box-name';
import { BoxWasCreatedEvent } from '../event/box-was-created.event';
import { Athlete } from './athlete';
import { UserId } from '../../../user';
import { AthleteId } from './athlete-id';
import { AdminAthleteWasCreatedEvent } from '../event/admin-athlete-was-created.event';
import { AthleteRole } from './athlete-role';
import { UserEmail } from '../../../user/domain/model/user-email';

export class Box extends AggregateRoot {
  private _id!: BoxId;
  private _name!: BoxName;
  private _athletes!: Athlete[];

  constructor(id?: BoxId, name?: BoxName, athletes?: Athlete[]) {
    super();
    this._id = id;
    this._name = name;
    this._athletes = athletes;
  }

  public static add(name: BoxName, userId: UserId, email: UserEmail): Box {
    const box = new Box();
    const boxId = BoxId.generate().value;

    const boxWasCreatedEvent = new BoxWasCreatedEvent(boxId, name.value);

    const adminAthleteWasCreated = new AdminAthleteWasCreatedEvent(
      AthleteId.generate().value,
      email.value,
      userId.value,
      boxId,
      AthleteRole.admin().value,
    );

    box.apply(boxWasCreatedEvent);
    box.apply(adminAthleteWasCreated);

    return box;
  }

  private onBoxWasCreatedEvent(event: BoxWasCreatedEvent): void {
    this._id = BoxId.from(event.id);
    this._name = BoxName.from(event.name);
    this._athletes = [];
  }

  private onAdminAthleteWasCreatedEvent(event: AdminAthleteWasCreatedEvent): void {
    const adminAthlete = new Athlete(
      AthleteId.from(event.id),
      UserEmail.from(event.email),
      UserId.from(event.userId),
      AthleteRole.admin(),
      BoxId.from(event.boxId),
    );

    this._athletes = [...this.athletes, adminAthlete];
  }

  aggregateId(): string {
    return this._id.value;
  }

  get id(): BoxId {
    return this._id;
  }

  get name(): BoxName {
    return this._name;
  }

  get athletes(): Athlete[] {
    return this._athletes;
  }
}