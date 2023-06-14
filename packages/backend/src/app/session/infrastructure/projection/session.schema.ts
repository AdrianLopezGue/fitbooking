import { Document, Schema } from 'mongoose';
import { SessionDTO } from '../../application/service/session-finder.service';

export const SESSION_PROJECTION = 'sessions';

export type SessionDocument = SessionDTO & Document;

export const SessionSchema = new Schema(
  {
    _id: String,
    assistants: Array<string>,
    maxCapacity: Number,
  },
  {
    versionKey: false,
  },
);
