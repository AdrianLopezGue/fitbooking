import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app/app.module';
import { io, Socket } from 'socket.io-client';

describe('EventsGateway', () => {
  let app: INestApplication;
  let socket: Socket;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(8080);
  });

  beforeEach(() => {
    socket = io('http://localhost:8080');
    socket.connect();
  });

  describe('reserveClass', () => {
    it('should reserve class if class is empty', () => {
      socket.emit('reserveClass');
      socket.on('reservationsCount', data => {
        expect(data).toBe(1);
      });
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  afterAll(async () => {
    await app.close();
  });
});
