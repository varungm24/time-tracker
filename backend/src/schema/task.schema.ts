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
  @Prop()
  duration: string;
}

const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ start: 1 });

export { TaskSchema };
