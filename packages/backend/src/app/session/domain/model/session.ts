import { AggregateRoot, DomainError } from '@aulasoftwarelibre/nestjs-eventstore';
import { Result, err, ok } from 'neverthrow';
import { UserId } from '../../../user';
import { SessionSeatWasBookedEvent } from '../event/session-seat-was-booked.event';
import { SessionId } from './session-id';
import { SessionWasCreatedEvent } from '../event/session-was-created.event';
import { AssistantAlreadyConfirmed } from '../exception/assistant-already-confirmed.error';
import { SessionWithoutAvailableSeats } from '../exception/session-without-available-seats.error';
import { SessionSeatWasCancelledEvent } from '../event/session-seat-was-cancelled.event';
import { AssistantNotFound } from '../exception/assistant-not-found.error';
import { SessionName } from './session-name';
import { SessionMaxCapacity } from './session-max-capacity';

export class Session extends AggregateRoot {
  private _id!: SessionId;
  private _name!: SessionName;
  private _maxCapacity!: SessionMaxCapacity;
  private _assistants!: UserId[];
  private _date!: Date;

  constructor(
    id?: SessionId,
    name?: SessionName,
    assistants?: UserId[],
    maxCapacity?: SessionMaxCapacity,
    date?: Date,
  ) {
    super();
    this._id = id;
    this._name = name;
    this._maxCapacity = maxCapacity;
    this._assistants = assistants;
    this._date = date;
  }

  public static add(
    name: SessionName,
    maxCapacity: SessionMaxCapacity,
    date: Date,
  ): Session {
    const session = new Session();

    const event = new SessionWasCreatedEvent(
      SessionId.generate().value,
      name.value,
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
    this._maxCapacity = SessionMaxCapacity.from(event.maxCapacity);
    this._assistants = event.assistants.map(assistant => UserId.from(assistant));
    this._date = event.date;
  }

  get id(): SessionId {
    return this._id;
  }

  get name(): SessionName {
    return this._name;
  }
  get assistants(): UserId[] {
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
    assistant: UserId,
  ): Result<Session, AssistantAlreadyConfirmed | SessionWithoutAvailableSeats> {
    if (this.assistants.filter(a => a.value == assistant.value).length) {
      return err(AssistantAlreadyConfirmed.with(this.id.value, assistant.value));
    }

    if (this.assistants.length >= this.maxCapacity.value) {
      return err(SessionWithoutAvailableSeats.with(this.id.value));
    }

    this.apply(new SessionSeatWasBookedEvent(this.id.value, assistant.value));
    return ok(this);
  }

  private onSessionSeatWasBookedEvent(event: SessionSeatWasBookedEvent): void {
    this._assistants.push(UserId.from(event.assistant));
  }

  cancel(assistant: UserId): Result<Session, DomainError> {
    if (!this.assistants.map(a => a.value).includes(assistant.value)) {
      return err(
        new AssistantNotFound('Cannot cancel a book if assistant did not booked'),
      );
    }

    this.apply(new SessionSeatWasCancelledEvent(this.id.value, assistant.value));
    return ok(this);
  }

  private onSessionSeatWasCancelledEvent(event: SessionSeatWasCancelledEvent): void {
    this._assistants = this.assistants.filter(a => a.value !== event.assistant);
  }
}
