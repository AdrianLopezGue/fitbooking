import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasBookedEvent } from '../../domain';
import { EventsGateway } from './events.gateway';

@EventsHandler(SessionSeatWasBookedEvent)
export class SessionSeatWasBookedHandler
  implements IEventHandler<SessionSeatWasBookedEvent>
{
  constructor(private readonly eventsGateway: EventsGateway) {}
  async handle(event: SessionSeatWasBookedEvent) {
    this.eventsGateway.server.emit('classReserved', {
      assistantRegistered: event.assistant,
    });
  }
}
