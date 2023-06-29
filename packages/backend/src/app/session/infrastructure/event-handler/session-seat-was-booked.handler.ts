import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasBookedEvent } from '../../domain';
import { WebsocketSessionGateway } from '../websocket/session.gateway';

@EventsHandler(SessionSeatWasBookedEvent)
export class SessionSeatWasBookedHandler
  implements IEventHandler<SessionSeatWasBookedEvent>
{
  constructor(private readonly websocketGateway: WebsocketSessionGateway) {}
  async handle(event: SessionSeatWasBookedEvent) {
    const clients = this.websocketGateway.server.sockets.adapter.rooms.get(event.id);

    if (clients) {
      clients.forEach(clientId => {
        this.websocketGateway.server.to(clientId).emit('classReserved', {
          sessionId: event.id,
          assistantRegistered: event.assistant,
        });
      });
    }
  }
}
