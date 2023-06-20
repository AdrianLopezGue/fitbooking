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

    const moduleRef = await Test.createTestingModule({
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

    boxFinder = moduleRef.get<MongoBoxFinder>(MongoBoxFinder);
    boxProjectionModel = moduleRef.get<Model<BoxDocument>>(getModelToken(BOX_PROJECTION));
    athleteProjectionModel = moduleRef.get<Model<AthleteDocument>>(
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
        name: 'Session name 1',
      };
      const athlete: AthleteDocument = {
        _id: '470ec39f-91af-48a0-9bd4-f8fce48e79d4',
        email: 'athlete@mail.com',
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
});
