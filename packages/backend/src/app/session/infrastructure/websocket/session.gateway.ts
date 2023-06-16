import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Reservation {
  clientId: string;
  reservedBy: string;
}

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
@Injectable()
export class WebsocketSessionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private reservations: Map<string, Reservation> = new Map<string, Reservation>();

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`, this.reservations);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`, this.reservations);
  }
}