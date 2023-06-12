import AggregateRoot from '../AggregateRoot';
import DomainEvent from './DomainEvent';
import DomainEventHandler from './DomainEventHandler';

export default interface DomainEventBus {
  publish(domainEvent: DomainEvent<AggregateRoot>): Promise<unknown>;

  subscribe(domainHandler: DomainEventHandler): void;
}
