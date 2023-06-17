import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

import { SESSION_PROJECTION, SessionDocument, SessionSchema } from '../../projection';
import { MongoSessionFinder } from './../mongo-session-finder.service';

describe('MongoSessionFinder', () => {
  let sessionFinder: MongoSessionFinder;
  let sessionProjectionModel: Model<SessionDocument>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleRef = await Test.createTestingModule({
      providers: [
        MongoSessionFinder,
        {
          provide: getModelToken(SESSION_PROJECTION),
          useFactory: () => mongoose.model<SessionDocument>('Session', SessionSchema),
        },
      ],
    }).compile();

    sessionFinder = moduleRef.get<MongoSessionFinder>(MongoSessionFinder);
    sessionProjectionModel = moduleRef.get<Model<SessionDocument>>(
      getModelToken(SESSION_PROJECTION),
    );

    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await sessionProjectionModel.deleteMany({});
  });

  describe('find', () => {
    it('should return sessions that match the given id', async () => {
      const sessionId = '572d1fed-8521-49f5-b6cb-767bd13b161e';
      const session1: SessionDocument = {
        _id: '572d1fed-8521-49f5-b6cb-767bd13b161e',
        name: 'Session name 1',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-17'),
      };
      const session2: SessionDocument = {
        _id: 'ca014231-72db-4c32-adc1-c744a2e3b3a6',
        name: 'Session name 2',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-18'),
      };

      await sessionProjectionModel.create([session1, session2]);

      const result = await sessionFinder.find(sessionId);

      expect(result).toBeDefined();
    });

    it('should return an empty array if no sessions match the given date', async () => {
      const date = new Date('2023-06-17');

      const result = await sessionFinder.findByDate(date);

      expect(result).toHaveLength(0);
    });
  });

  describe('findByDate', () => {
    it('should return sessions that match the given date', async () => {
      const date = new Date('2023-06-17');
      const session1: SessionDocument = {
        _id: 'session1',
        name: 'Session name',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-17'),
      };
      const session2: SessionDocument = {
        _id: 'session2',
        name: 'Session name',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-18'),
      };

      await sessionProjectionModel.create([session1, session2]);

      const result = await sessionFinder.findByDate(date);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toEqual('session1');
      expect(result[0].date).toEqual(date);
    });

    it('should return an empty array if no sessions match the given date', async () => {
      const date = new Date('2023-06-17');

      const result = await sessionFinder.findByDate(date);

      expect(result).toHaveLength(0);
    });
  });
});
