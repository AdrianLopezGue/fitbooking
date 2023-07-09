import { AthleteListDTO, BoxDTO, BoxListDTO } from '@fitbooking/contracts';

export const BOX_FINDER = 'BOX_FINDER';

export interface BoxFinder {
  find(id: string): Promise<BoxDTO | undefined>;
  findByEmail(email: string): Promise<BoxListDTO>;
  findAthletesByBox(boxId: string): Promise<AthleteListDTO>;
}
