import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const ATHLETE_SESSIONS_BOOKED_PROJECTION = 'athlete_sessions_booked';

@Schema({ versionKey: false })
export class AthleteSessionsBookedDocument {
  @Prop({ required: true })
  athleteId: string;

  @Prop({ required: true })
  month: number;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true, type: Object })
  sessions: Record<number, string[]>;
}

export const AthleteSessionsBookedDocumentSchema = SchemaFactory.createForClass(
  AthleteSessionsBookedDocument,
);
