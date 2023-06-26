export const SESSION_FINDER = 'SESSION_FINDER';

export type SessionDTO = {
  _id: string;
  name: string;
  assistants: string[];
  maxCapacity: number;
  date: Date;
};

export interface SessionFinder {
  find(id: string): Promise<SessionDTO | undefined>;
  findByDateAndBox(date: Date, boxId: string): Promise<SessionDTO[] | undefined>;
}
