import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly userName: string;
  readonly email: string;
  readonly role: string;
  readonly emailInvite: boolean;
}
