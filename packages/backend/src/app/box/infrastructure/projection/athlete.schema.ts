import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const ATHLETE_PROJECTION = 'athletes';

@Schema({ versionKey: false })
export class AthleteDocument {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  boxId: string;
}

export const AthleteSchema = SchemaFactory.createForClass(AthleteDocument);
