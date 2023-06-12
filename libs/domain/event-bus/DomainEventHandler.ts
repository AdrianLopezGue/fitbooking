import AggregateRoot from '../AggregateRoot';
import DomainEvent from './DomainEvent';

export default interface DomainEventHandler {
  subscribeTo(): string[];

  handle(domainEvent: DomainEvent<AggregateRoot>): Promise<void>;
}
