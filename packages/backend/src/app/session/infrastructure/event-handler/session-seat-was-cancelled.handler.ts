import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SessionSeatWasCancelledEvent } from '../../domain';
import { WebsocketSessionGateway } from '../websocket/session.gateway';

@EventsHandler(SessionSeatWasCancelledEvent)
export class SessionSeatWasCancelledHandler
  implements IEventHandler<SessionSeatWasCancelledEvent>
{
  constructor(private readonly websocketGateway: WebsocketSessionGateway) {}
  async handle(event: SessionSeatWasCancelledEvent) {
    this.websocketGateway.server.emit('classCancelled', {
      assistantRegistered: event.assistant,
    });
  }
}
