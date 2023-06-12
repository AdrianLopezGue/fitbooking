import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { SessionId } from './session-id';
import { UserId } from '../../../user';
import { SessionSeatWasBookedEvent } from '../event/session-seat-was-booked.event';
import { Err, Result, ok } from 'neverthrow';

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

  book(assistant: UserId): Result<void, Error> {
    if (this.assistants.includes(assistant)) {
      return new Err(new Error(`Assistant already subscribed to this session`));
    }

    if (this.assistants.length >= this.maxCapacity) {
      return new Err(new Error(`Session is already full`));
    }

    this.assistants.push(assistant);
    this.apply(new SessionSeatWasBookedEvent(this.id.value, assistant.value));
    return ok(null);
  }

  aggregateId(): string {
    return this._id.value;
  }
}
