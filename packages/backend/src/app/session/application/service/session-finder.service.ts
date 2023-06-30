import { SessionDTO } from '@fitbooking/contracts';

export const SESSION_FINDER = 'SESSION_FINDER';

export interface SessionFinder {
  find(id: string): Promise<SessionDTO | undefined>;
  findByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[] | undefined>;
}
