import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const BOX_PROJECTION = 'boxs';

@Schema({ versionKey: false })
export class BoxDocument {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;
}

export const BoxSchema = SchemaFactory.createForClass(BoxDocument);
