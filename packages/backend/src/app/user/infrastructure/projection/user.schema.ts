import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const USER_PROJECTION = 'users';

@Schema({ versionKey: false })
export class UserDocument {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
