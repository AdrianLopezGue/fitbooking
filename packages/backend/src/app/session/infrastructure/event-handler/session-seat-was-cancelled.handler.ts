import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasCancelledEvent } from '../../domain';
import { WebsocketSessionGateway } from '../websocket/session.gateway';

@EventsHandler(SessionSeatWasCancelledEvent)
export class SessionSeatWasCancelledHandler
  implements IEventHandler<SessionSeatWasCancelledEvent>
{
  constructor(private readonly websocketGateway: WebsocketSessionGateway) {}
  async handle(event: SessionSeatWasCancelledEvent) {
    const clients = this.websocketGateway.server.sockets.adapter.rooms.get(event.id);

    if (clients) {
      clients.forEach(clientId => {
        this.websocketGateway.server.to(clientId).emit('classCancelled', {
          sessionId: event.id,
          assistantCancelled: event.assistant,
        });
      });
    }
  }
}
