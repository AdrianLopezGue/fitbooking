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

export class Session extends AggregateRoot {
  private _id!: SessionId;
  private _maxCapacity!: number;
  private _assistants!: UserId[];

  constructor(id?: SessionId, assistants?: UserId[], maxCapacity?: number) {
    super();
    this._id = id;
    this._maxCapacity = maxCapacity;
    this._assistants = assistants;
  }

  public static add(maxCapacity: number): Session {
    const session = new Session();

    const event = new SessionWasCreatedEvent(SessionId.generate().value, [], maxCapacity);

    session.apply(event);
    return session;
  }

  private onSessionWasCreatedEvent(event: SessionWasCreatedEvent): void {
    this._id = SessionId.fromString(event.id);
    this._maxCapacity = event.maxCapacity;
    this._assistants = event.assistants.map(assistant => UserId.fromString(assistant));
  }

  get id(): SessionId {
    return this._id;
  }

  get assistants(): UserId[] {
    return this._assistants;
  }

  get maxCapacity(): number {
    return this._maxCapacity;
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

    if (this.assistants.length >= this.maxCapacity) {
      return err(SessionWithoutAvailableSeats.with(this.id.value));
    }

    this.apply(new SessionSeatWasBookedEvent(this.id.value, assistant.value));
    return ok(this);
  }

  private onSessionSeatWasBookedEvent(event: SessionSeatWasBookedEvent): void {
    this._assistants.push(UserId.fromString(event.assistant));
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
