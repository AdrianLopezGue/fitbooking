import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

import {
  ATHLETE_PROJECTION,
  AthleteDocument,
  AthleteSchema,
  BOX_PROJECTION,
  BoxDocument,
  BoxSchema,
} from '../../projection';
import { MongoBoxFinder } from './../mongo-box-finder.service';
import { AthleteRolesEnum } from '../../../domain/model/athlete-role';

describe('MongoBoxFinder', () => {
  let boxFinder: MongoBoxFinder;
  let boxProjectionModel: Model<BoxDocument>;
  let athleteProjectionModel: Model<AthleteDocument>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleReference = await Test.createTestingModule({
      providers: [
        MongoBoxFinder,
        {
          provide: getModelToken(BOX_PROJECTION),
          useFactory: () => mongoose.model<BoxDocument>('Box', BoxSchema),
        },
        {
          provide: getModelToken(ATHLETE_PROJECTION),
          useFactory: () => mongoose.model<AthleteDocument>('Athlete', AthleteSchema),
        },
      ],
    }).compile();

    boxFinder = moduleReference.get<MongoBoxFinder>(MongoBoxFinder);
    boxProjectionModel = moduleReference.get<Model<BoxDocument>>(
      getModelToken(BOX_PROJECTION),
    );
    athleteProjectionModel = moduleReference.get<Model<AthleteDocument>>(
      getModelToken(ATHLETE_PROJECTION),
    );

    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await boxProjectionModel.deleteMany({});
    await athleteProjectionModel.deleteMany({});
  });

  describe('find', () => {
    it('should return box that match the given id', async () => {
      const boxId = '572d1fed-8521-49f5-b6cb-767bd13b161e';
      const box: BoxDocument = {
        _id: boxId,
        name: 'Box name 1',
        location: 'Spain',
      };
      const athlete: AthleteDocument = {
        _id: '470ec39f-91af-48a0-9bd4-f8fce48e79d4',
        name: 'Athlete name',
        email: 'athlete@mail.com',
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId,
      };

      await Promise.all([
        boxProjectionModel.create([box]),
        athleteProjectionModel.create([athlete]),
      ]);

      const result = await boxFinder.find(boxId);

      expect(result).toBeDefined();
      expect(result.athletes).toHaveLength(1);
    });

    it('should return undefined if box with given id is not found', async () => {
      const boxId = '572d1fed-8521-49f5-b6cb-767bd13b161e';

      const result = await boxFinder.find(boxId);

      expect(result).not.toBeDefined();
    });
  });

  describe('find by email', () => {
    it('should return box that match the given id', async () => {
      const email = 'athlete@mail.com';
      const box: BoxDocument = {
        _id: '572d1fed-8521-49f5-b6cb-767bd13b161e',
        name: 'Box name 1',
        location: 'Spain',
      };
      const box2: BoxDocument = {
        _id: '9c48980c-c64a-4489-928c-c58eb3939098',
        name: 'Box name 2',
        location: 'Spain',
      };
      const box3: BoxDocument = {
        _id: 'e1adb755-d562-474f-82cc-bc855e38ed12',
        name: 'Box name 3',
        location: 'Spain',
      };
      const athlete: AthleteDocument = {
        _id: '470ec39f-91af-48a0-9bd4-f8fce48e79d4',
        name: 'Athlete name',
        email,
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId: box._id,
      };
      const athlete2: AthleteDocument = {
        _id: '6838e775-fb42-4aa4-b91f-138f94c75c95',
        name: 'Athlete 2 name',
        email,
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId: box2._id,
      };
      const anotherAthlete: AthleteDocument = {
        _id: '91a8e08f-cf65-4f73-841b-c2fb7705e04b',
        name: 'Athlete 3 name',
        email: 'another@email.com',
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId: box2._id,
      };

      await Promise.all([
        boxProjectionModel.create([box, box2, box3]),
        athleteProjectionModel.create([athlete, athlete2, anotherAthlete]),
      ]);

      const result = await boxFinder.findByEmail(athlete.email);

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
    });
  });

  describe('find athletes by box', () => {
    it('should return atheletes that match the given box id', async () => {
      const email = 'athlete@mail.com';
      const box: BoxDocument = {
        _id: '572d1fed-8521-49f5-b6cb-767bd13b161e',
        name: 'Box name 1',
        location: 'Spain',
      };
      const box2: BoxDocument = {
        _id: '9c48980c-c64a-4489-928c-c58eb3939098',
        name: 'Box name 2',
        location: 'Spain',
      };
      const box3: BoxDocument = {
        _id: 'e1adb755-d562-474f-82cc-bc855e38ed12',
        name: 'Box name 3',
        location: 'Spain',
      };
      const athlete: AthleteDocument = {
        _id: '470ec39f-91af-48a0-9bd4-f8fce48e79d4',
        name: 'Athlete name',
        email,
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId: box._id,
      };
      const athlete2: AthleteDocument = {
        _id: '6838e775-fb42-4aa4-b91f-138f94c75c95',
        name: 'Athlete 2 name',
        email,
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId: box2._id,
      };
      const anotherAthlete: AthleteDocument = {
        _id: '91a8e08f-cf65-4f73-841b-c2fb7705e04b',
        name: 'Athlete 3 name',
        email: 'another@email.com',
        acceptedAt: new Date(),
        invitedAt: new Date(),
        userId: 'd0681555-0e88-470e-b351-bed8c2bc5941',
        role: AthleteRolesEnum.ADMIN,
        boxId: box2._id,
      };

      await Promise.all([
        boxProjectionModel.create([box, box2, box3]),
        athleteProjectionModel.create([athlete, athlete2, anotherAthlete]),
      ]);

      const result = await boxFinder.findAthletesByBox(box._id);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });
  });
});
