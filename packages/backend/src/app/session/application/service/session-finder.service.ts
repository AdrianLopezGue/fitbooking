import { SessionDTO, SessionsBookedDTO } from '@fitbooking/contracts';

export const SESSION_FINDER = 'SESSION_FINDER';

export interface SessionFinder {
  find(id: string): Promise<SessionDTO | undefined>;
  findByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[] | undefined>;
  findByAthleteAndDate(
    athleteId: string,
    month: number,
    year: number,
  ): Promise<SessionsBookedDTO | undefined>;
}
