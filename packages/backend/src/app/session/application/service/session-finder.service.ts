export const SESSION_FINDER = 'SESSION_FINDER';

export type SessionDTO = {
  _id: string;
  assistants: string[];
  maxCapacity: number;
};

export interface SessionFinder {
  find(id: string): Promise<SessionDTO | undefined>;
}
