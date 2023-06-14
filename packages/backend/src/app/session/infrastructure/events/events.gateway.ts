import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

interface Reservation {
  clientId: string;
  reservedBy: string;
}

type Session = {
  id: string;
  assistants: string[];
};

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private reservations: Map<string, Reservation> = new Map<string, Reservation>();
  private session: Session;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`, this.reservations);
    this.server.emit('reservationsCount', this.reservations.size);
    this.sendReservationStatus(client);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`, this.reservations);
    if (this.reservations.has(client.id)) {
      this.releaseSession(undefined, client);
    }
    this.server.emit('reservationsCount', this.reservations.size);
  }

  @SubscribeMessage('reserveSession')
  reserveSession(@MessageBody() _data: unknown, @ConnectedSocket() client: Socket): void {
    if (!this.reservations.has(client.id)) {
      const reservation: Reservation = {
        clientId: client.id,
        reservedBy: client.id,
      };
      this.reservations.set(client.id, reservation);
      this.server.emit('classReserved');
      this.server.emit('reservationsCount', this.reservations.size);
      this.sendReservationStatus(client);
      console.log(`Session reserved by client: ${client?.id}`);
    }
  }

  @SubscribeMessage('releaseSession')
  releaseSession(@MessageBody() _data: unknown, @ConnectedSocket() client: Socket): void {
    if (this.reservations.has(client.id)) {
      this.reservations.delete(client.id);
      this.server.emit('classReleased');
      this.server.emit('reservationsCount', this.reservations.size);
      this.sendReservationStatus(client);
      console.log(`Session released by client: ${client.id}`);
    }

    throw new WsException('Cannot reserve from another person.');
  }

  @SubscribeMessage('getReservations')
  getReservations(): Observable<WsResponse<number>> {
    const reservationsCount = this.reservations.size;
    return from([{ event: 'reservationsCount', data: reservationsCount }]);
  }

  private sendReservationStatus(client: Socket): void {
    const reservation = this.reservations.get(client.id);
    const isReservedByClient = reservation && reservation.reservedBy === client.id;
    client.emit('reservationStatus', isReservedByClient);
  }
}
