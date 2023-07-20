import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TaskService } from './service/task/task.service';
import { TaskController } from './controller/task/task.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'time-tracker',
    }),
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],

  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}
