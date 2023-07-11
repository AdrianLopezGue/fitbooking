import { AggregateRoot, DomainError } from '@aulasoftwarelibre/nestjs-eventstore';
import { Result, err, ok } from 'neverthrow';
import { SessionSeatWasBookedEvent } from '../event/session-seat-was-booked.event';
import { SessionId } from './session-id';
import { SessionWasCreatedEvent } from '../event/session-was-created.event';
import { AssistantAlreadyConfirmed } from '../error/assistant-already-confirmed.error';
import { SessionWithoutAvailableSeats } from '../error/session-without-available-seats.error';
import { SessionSeatWasCancelledEvent } from '../event/session-seat-was-cancelled.event';
import { AssistantNotFound } from '../error/assistant-not-found.error';
import { SessionName } from './session-name';
import { SessionMaxCapacity } from './session-max-capacity';
import { AthleteId } from '../../../box/domain/model/athlete-id';
import { BoxId } from '../../../box/domain/model/box-id';

export class Session extends AggregateRoot {
  private _id!: SessionId;
  private _name!: SessionName;
  private _boxId!: BoxId;
  private _maxCapacity!: SessionMaxCapacity;
  private _assistants!: AthleteId[];
  private _date!: Date;

  constructor(
    id?: SessionId,
    name?: SessionName,
    boxId?: BoxId,
    assistants?: AthleteId[],
    maxCapacity?: SessionMaxCapacity,
    date?: Date,
  ) {
    super();
    this._id = id;
    this._name = name;
    this._boxId = boxId;
    this._maxCapacity = maxCapacity;
    this._assistants = assistants;
    this._date = date;
  }

  public static add(
    name: SessionName,
    boxId: BoxId,
    maxCapacity: SessionMaxCapacity,
    date: Date,
  ): Session {
    const session = new Session();

    const event = new SessionWasCreatedEvent(
      SessionId.generate().value,
      name.value,
      boxId.value,
      [],
      maxCapacity.value,
      date,
    );

    session.apply(event);
    return session;
  }

  private onSessionWasCreatedEvent(event: SessionWasCreatedEvent): void {
    this._id = SessionId.from(event.id);
    this._name = SessionName.from(event.name);
    this._boxId = BoxId.from(event.boxId);
    this._maxCapacity = SessionMaxCapacity.from(event.maxCapacity);
    this._assistants = event.assistants.map(assistant => AthleteId.from(assistant));
    this._date = event.date;
  }

  get id(): SessionId {
    return this._id;
  }

  get name(): SessionName {
    return this._name;
  }

  get boxId(): BoxId {
    return this._boxId;
  }

  get assistants(): AthleteId[] {
    return this._assistants;
  }

  get maxCapacity(): SessionMaxCapacity {
    return this._maxCapacity;
  }

  get date(): Date {
    return this._date;
  }

  aggregateId(): string {
    return this._id.value;
  }

  book(
    assistant: AthleteId,
  ): Result<Session, AssistantAlreadyConfirmed | SessionWithoutAvailableSeats> {
    if (this.assistants.some(a => a.value == assistant.value)) {
      return err(AssistantAlreadyConfirmed.with(this.id.value, assistant.value));
    }

    if (this.assistants.length >= this.maxCapacity.value) {
      return err(SessionWithoutAvailableSeats.with(this.id.value));
    }

    this.apply(new SessionSeatWasBookedEvent(this.id.value, assistant.value, this.date));
    return ok(this);
  }

  private onSessionSeatWasBookedEvent(event: SessionSeatWasBookedEvent): void {
    this._assistants.push(AthleteId.from(event.assistant));
  }

  cancel(assistant: AthleteId): Result<Session, DomainError> {
    if (!this.assistants.map(a => a.value).includes(assistant.value)) {
      return err(
        new AssistantNotFound('Cannot cancel a book if assistant did not booked'),
      );
    }

    this.apply(
      new SessionSeatWasCancelledEvent(this.id.value, assistant.value, this.date),
    );
    return ok(this);
  }

  private onSessionSeatWasCancelledEvent(event: SessionSeatWasCancelledEvent): void {
    this._assistants = this.assistants.filter(a => a.value !== event.assistant);
  }
}
