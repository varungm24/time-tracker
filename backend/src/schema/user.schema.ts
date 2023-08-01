import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop()
  userName: string;
  @Prop()
  email: string;
  @Prop()
  role: string;
  @Prop()
  emailInvite: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userName: 1 });

export { UserSchema };
