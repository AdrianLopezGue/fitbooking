import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasBookedEvent } from '../../domain';
import { WebsocketSessionGateway } from './session.gateway';

@EventsHandler(SessionSeatWasBookedEvent)
export class SessionSeatWasBookedHandler
  implements IEventHandler<SessionSeatWasBookedEvent>
{
  constructor(private readonly websocketGateway: WebsocketSessionGateway) {}
  async handle(event: SessionSeatWasBookedEvent) {
    this.websocketGateway.server.emit('classReserved', {
      assistantRegistered: event.assistant,
    });
  }
}
