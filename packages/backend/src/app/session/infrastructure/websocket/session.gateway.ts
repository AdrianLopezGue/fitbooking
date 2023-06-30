import { Injectable } from '@nestjs/common';
import { IQuery, QueryBus } from '@nestjs/cqrs';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetSessionsByDateAndBoxQuery } from '../../application/query/get-sessions-by-date-and-box.query';
import { SessionDTO } from '@fitbooking/contracts';

type Query = {
  date: string;
  boxId: string;
  athleteId: string;
};

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
@Injectable()
export class WebsocketSessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private sessions: Map<string, string[]> = new Map<string, string[]>();

  constructor(private readonly queryBus: QueryBus) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { date, boxId } = client.handshake.query as Query;
    const dateParsed = Date.parse(date);
    const sessions = await this.queryBus.execute<IQuery, SessionDTO[]>(
      new GetSessionsByDateAndBoxQuery(new Date(dateParsed), boxId),
    );
    this.sessions[client.id] = sessions.map(session => session._id);

    sessions.forEach(session => client.join(session._id));
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`, this.sessions);
    this.sessions.delete(client.id);
  }

  @SubscribeMessage('dateChanged')
  async reserveSession(
    @MessageBody()
    { boxId, date }: { boxId: string; athleteId: string; date: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    if (this.sessions.has(client.id)) {
      this.sessions.get(client.id).forEach(session => client.leave(session));
      const dateParsed = Date.parse(date);
      const sessions = await this.queryBus.execute<IQuery, SessionDTO[]>(
        new GetSessionsByDateAndBoxQuery(new Date(dateParsed), boxId),
      );

      this.sessions[client.id] = sessions.map(session => session._id);

      sessions.forEach(session => client.join(session._id));
    }
  }
}
