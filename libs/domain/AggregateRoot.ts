import type DomainEvent from './event-bus/DomainEvent';

export default class AggregateRoot {
  private _domainEvents: DomainEvent<AggregateRoot>[] = [];

  public pullEvents(): DomainEvent<AggregateRoot>[] {
    const domainEvents = this._domainEvents;
    this._domainEvents = [];

    return domainEvents;
  }

  public registerEvent(domainEvent: DomainEvent<AggregateRoot>): void {
    this._domainEvents = [...this._domainEvents, domainEvent];
  }
}
