export const BOX_FINDER = 'BOX_FINDER';

type AthleteDTO = {
  _id: string;
  userId: string;
  role: string;
};

export type BoxDTO = {
  _id: string;
  name: string;
  athletes: AthleteDTO[];
};

export interface BoxFinder {
  find(id: string): Promise<BoxDTO | undefined>;
}
