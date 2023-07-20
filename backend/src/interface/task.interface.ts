import { Document } from 'mongoose';
export interface ITask extends Document {
  readonly project: string;
  readonly task: string;
  readonly description: string;
  readonly start: string;
  readonly end: string;
}
