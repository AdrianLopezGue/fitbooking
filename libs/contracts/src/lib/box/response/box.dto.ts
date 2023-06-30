import { AthleteDTO } from './athlete.dto';

export type BoxDTO = {
  _id: string;
  name: string;
  athletes: AthleteDTO[];
};
