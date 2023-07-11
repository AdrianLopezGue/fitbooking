import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

import { SESSION_PROJECTION, SessionDocument, SessionSchema } from '../../projection';
import { MongoSessionFinder } from './../mongo-session-finder.service';
import {
  ATHLETE_SESSIONS_BOOKED_PROJECTION,
  AthleteSessionsBookedDocument,
  AthleteSessionsBookedDocumentSchema,
} from '../../projection/athlete-sessions-booked.schema';

describe('MongoSessionFinder', () => {
  let sessionFinder: MongoSessionFinder;
  let sessionProjectionModel: Model<SessionDocument>;
  let athleteSessionsBookedModel: Model<AthleteSessionsBookedDocument>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleReference = await Test.createTestingModule({
      providers: [
        MongoSessionFinder,
        {
          provide: getModelToken(SESSION_PROJECTION),
          useFactory: () => mongoose.model<SessionDocument>('Session', SessionSchema),
        },
        {
          provide: getModelToken(ATHLETE_SESSIONS_BOOKED_PROJECTION),
          useFactory: () =>
            mongoose.model<AthleteSessionsBookedDocument>(
              'AthleteSessionsBooked',
              AthleteSessionsBookedDocumentSchema,
            ),
        },
      ],
    }).compile();

    sessionFinder = moduleReference.get<MongoSessionFinder>(MongoSessionFinder);
    sessionProjectionModel = moduleReference.get<Model<SessionDocument>>(
      getModelToken(SESSION_PROJECTION),
    );
    athleteSessionsBookedModel = moduleReference.get<
      Model<AthleteSessionsBookedDocument>
    >(getModelToken(ATHLETE_SESSIONS_BOOKED_PROJECTION));

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
        _id: sessionId,
        name: 'Session name 1',
        boxId: 'a780873d-4bd2-44c7-b4f4-434781b2ee2b',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-17'),
      };
      const session2: SessionDocument = {
        _id: 'ca014231-72db-4c32-adc1-c744a2e3b3a6',
        name: 'Session name 2',
        boxId: '2712bd5c-6d28-4346-982b-27272ae6934f',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-18'),
      };

      await sessionProjectionModel.create([session1, session2]);

      const result = await sessionFinder.find(sessionId);

      expect(result).toBeDefined();
    });

    it('should return undefined if id does not exist', async () => {
      const result = await sessionFinder.find('2712bd5c-6d28-4346-982b-27272ae6934f');

      expect(result).toBeNull();
    });
  });

  describe('findByDate', () => {
    it('should return sessions that match the given date', async () => {
      const date = new Date('2023-06-17');
      const boxId = 'a780873d-4bd2-44c7-b4f4-434781b2ee2b';
      const session1: SessionDocument = {
        _id: '572d1fed-8521-49f5-b6cb-767bd13b161e',
        name: 'Session name 1',
        boxId,
        assistants: [],
        maxCapacity: 1,
        date,
      };
      const session2: SessionDocument = {
        _id: 'ca014231-72db-4c32-adc1-c744a2e3b3a6',
        name: 'Session name 2',
        boxId: '2712bd5c-6d28-4346-982b-27272ae6934f',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-18'),
      };

      await sessionProjectionModel.create([session1, session2]);

      const result = await sessionFinder.findByDateAndBox(date, boxId);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toEqual(session1._id);
      expect(result[0].date).toEqual(date);
    });

    it('should return an empty array if no sessions match the given date', async () => {
      const date = new Date('2023-06-17');

      const result = await sessionFinder.findByDateAndBox(
        date,
        'a780873d-4bd2-44c7-b4f4-434781b2ee2b',
      );

      expect(result).toHaveLength(0);
    });

    it('should return sessions from given date', async () => {
      const date = new Date('2023-7-7');
      const boxId = 'a780873d-4bd2-44c7-b4f4-434781b2ee2b';
      const sessionInSameDate: SessionDocument = {
        _id: '572d1fed-8521-49f5-b6cb-767bd13b161e',
        name: 'Session name 1',
        boxId,
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-07-07T06:56:17.126Z'),
      };
      const session2: SessionDocument = {
        _id: 'ca014231-72db-4c32-adc1-c744a2e3b3a6',
        name: 'Session name 2',
        boxId: '2712bd5c-6d28-4346-982b-27272ae6934f',
        assistants: [],
        maxCapacity: 1,
        date: new Date('2023-06-18'),
      };

      await sessionProjectionModel.create([sessionInSameDate, session2]);

      const result = await sessionFinder.findByDateAndBox(date, boxId);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toEqual(sessionInSameDate._id);
    });
  });

  describe('findByAthleteAndDate', () => {
    it('should return sessions that match the given date', async () => {
      const athleteId = 'e1003835-13d9-4eda-b0ae-9c6cc41d9a34';
      const month = 6;
      const year = 2023;
      const sessionBooked: AthleteSessionsBookedDocument = {
        athleteId,
        month,
        year,
        sessions: { 1: ['20:00'], 22: ['10:30'] },
      };

      await athleteSessionsBookedModel.create([sessionBooked]);

      const result = await sessionFinder.findByAthleteAndDate(athleteId, month, year);

      expect(result).toBeDefined();
    });
  });
});
