import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const SESSION_PROJECTION = 'sessions';

@Schema({ versionKey: false })
export class SessionDocument {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  boxId: string;

  @Prop({ required: true, type: [String] })
  assistants: string[];

  @Prop({ required: true })
  maxCapacity: number;

  @Prop({ required: true })
  date: Date;
}

export const SessionSchema = SchemaFactory.createForClass(SessionDocument);
