import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Task {
  @Prop()
  project: string;
  @Prop()
  task: string;
  @Prop()
  description: string;
  @Prop()
  start: string;
  @Prop()
  end: string;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
