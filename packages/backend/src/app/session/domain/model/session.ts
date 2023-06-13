import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { Result, err, ok } from 'neverthrow';
import { UserId } from '../../../user';
import { SessionSeatWasBookedEvent } from '../event/session-seat-was-booked.event';
import { SessionId } from './session-id';

export class Session extends AggregateRoot {
  private _id: SessionId;
  private _maxCapacity: number;
  private _assistants: UserId[];

  constructor(id: SessionId, assistants: UserId[], maxCapacity: number) {
    super();
    this._id = id;
    this._maxCapacity = maxCapacity;
    this._assistants = assistants;
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

  book(assistant: UserId): Result<Session, Error> {
    if (this.assistants.filter(a => a.value == assistant.value).length) {
      return err(new Error(`Assistant already subscribed to this session`));
    }

    if (this.assistants.length >= this.maxCapacity) {
      return err(new Error(`Session is already full`));
    }

    this.apply(new SessionSeatWasBookedEvent(this.id.value, assistant.value));
    return ok(this);
  }

  private onSessionSeatWasBookedEvent(event: SessionSeatWasBookedEvent): void {
    this.assistants.push(UserId.fromString(event.assistant));
  }
}
