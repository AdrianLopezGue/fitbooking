import { Immutable } from '../../Immutable';
import { Option } from '../../Option';
import type AggregateRoot from '../AggregateRoot';
import ObjectIdValueObject from '../value-objects/ObjectIdValueObject';

export default class DomainEvent<T extends AggregateRoot> {
  readonly eventName: string;
  readonly occurredOn: string;
  // Optional for backward compability. Required when all events extend this class
  readonly aggregate?: Option<Immutable<T>>;
  readonly eventId?: string;

  constructor(args: { eventName: string; aggregate: T }) {
    this.eventId = ObjectIdValueObject.random().value;
    this.eventName = args.eventName;
    this.occurredOn = new Date().toUTCString();
    this.aggregate = args.aggregate as unknown as Immutable<T>;
  }
}
