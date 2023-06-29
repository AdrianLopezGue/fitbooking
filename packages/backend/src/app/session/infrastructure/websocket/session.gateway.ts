import { Injectable } from '@nestjs/common';
import { IQuery, QueryBus } from '@nestjs/cqrs';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SessionDTO } from '../../application/service/session-finder.service';
import { GetSessionsByDateAndBoxQuery } from '../../application/query/get-sessions-by-date-and-box.query';

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

  private reservations: Map<string, string[]> = new Map<string, string[]>();

  constructor(private readonly queryBus: QueryBus) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { date, boxId, athleteId } = client.handshake.query as Query;
    const dateParsed = Date.parse(date);
    const sessions = await this.queryBus.execute<IQuery, SessionDTO[]>(
      new GetSessionsByDateAndBoxQuery(new Date(dateParsed), boxId),
    );
    this.reservations[athleteId] = sessions.map(session => session._id);

    sessions.forEach(session => client.join(session._id));
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`, this.reservations);
  }
}
