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
import { AthleteWasInvitedEvent } from '../event/athlete-was-invited.event';
import { Result, err, ok } from 'neverthrow';
import { AthleteAlreadyExistingError } from '../error/athlete-already-existing.error';
import { InvitationWasAcceptedEvent } from '../event/invitation-was-accepted.event';
import { PendingAthleteNotFoundError } from '../error/pending-athlete-not-found.error';
import { AthleteIsAlreadyConfirmedError } from '../error/athlete-already-confirmed.error';
import { BoxLocation } from './box-location';

export class Box extends AggregateRoot {
  private _id!: BoxId;
  private _name!: BoxName;
  private _athletes!: Athlete[];
  private _location!: BoxLocation;

  constructor(id?: BoxId, name?: BoxName, athletes?: Athlete[], location?: BoxLocation) {
    super();
    this._id = id;
    this._name = name;
    this._athletes = athletes;
    this._location = location;
  }

  public static add(
    name: BoxName,
    location: BoxLocation,
    userId: UserId,
    email: UserEmail,
  ): Box {
    const box = new Box();
    const boxId = BoxId.generate();

    const boxWasCreatedEvent = new BoxWasCreatedEvent(
      boxId.value,
      name.value,
      location.value,
    );

    const adminAthleteWasCreated = new AdminAthleteWasCreatedEvent(
      boxId.value,
      AthleteId.generate().value,
      email.value,
      userId.value,
      boxId.value,
      AthleteRole.admin().value,
    );

    box.apply(boxWasCreatedEvent);
    box.apply(adminAthleteWasCreated);

    return box;
  }

  private onBoxWasCreatedEvent(event: BoxWasCreatedEvent): void {
    this._id = BoxId.from(event.id);
    this._name = BoxName.from(event.payload.name);
    this._athletes = [];
    this._location = BoxLocation.from(event.payload.location);
  }

  private onAdminAthleteWasCreatedEvent(event: AdminAthleteWasCreatedEvent): void {
    const adminAthlete = new Athlete(
      AthleteId.from(event.payload.athleteId),
      UserEmail.from(event.payload.email),
      UserId.from(event.payload.userId),
      AthleteRole.admin(),
      BoxId.from(event.payload.boxId),
    );

    this._athletes = [...this.athletes, adminAthlete];
  }

  public addAthlete(email: UserEmail): Result<undefined, AthleteAlreadyExistingError> {
    if (this.athletes.some(a => a.email.equals(email))) {
      return err(AthleteAlreadyExistingError.withEmail(email.value));
    }

    const athleteWasInvited = new AthleteWasInvitedEvent(
      this.id.value,
      AthleteId.generate().value,
      email.value,
      this.id.value,
      AthleteRole.basic().value,
    );

    this.apply(athleteWasInvited);
    return ok(undefined);
  }

  private onAthleteWasInvitedEvent(event: AthleteWasInvitedEvent) {
    const athlete = Athlete.fromBoxInvitation(
      AthleteId.from(event.payload.athleteId),
      UserEmail.from(event.payload.email),
      AthleteRole.from(event.payload.role),
      BoxId.from(event.payload.boxId),
    );

    this._athletes = [...this.athletes, athlete];
  }

  public acceptInvitation(
    email: UserEmail,
    userId: UserId,
  ): Result<undefined, PendingAthleteNotFoundError> {
    const pendingAthlete = this._athletes.find(athlete => athlete.email.equals(email));

    if (!pendingAthlete) {
      return err(PendingAthleteNotFoundError.withEmail(email.value));
    }

    if (pendingAthlete.isConfirmed()) {
      return err(
        AthleteIsAlreadyConfirmedError.causeIsConfirmed(pendingAthlete.id.value),
      );
    }

    const invitationWasAccepted = new InvitationWasAcceptedEvent(
      this.id.value,
      pendingAthlete.id.value,
      pendingAthlete.email.value,
      userId.value,
      this.id.value,
      pendingAthlete.role.value,
    );

    this.apply(invitationWasAccepted);
    return ok(undefined);
  }

  private onInvitationWasAcceptedEvent(event: InvitationWasAcceptedEvent) {
    const filteredAthletes = this._athletes.filter(
      athlete => athlete.email.value !== event.email,
    );
    const athleteWhoAccepted = this._athletes.find(
      athlete => athlete.email.value === event.email,
    );
    athleteWhoAccepted.acceptInvitation(UserId.from(event.userId));

    this._athletes = [...filteredAthletes, athleteWhoAccepted];
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

  get location(): BoxLocation {
    return this._location;
  }
}
