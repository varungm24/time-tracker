import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TaskService } from './service/task/task.service';
import { TaskController } from './controller/task/task.controller';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { UserSchema } from './schema/user.schema';
import * as AWS from 'aws-sdk/global';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://varungm:Tlq5XS4IxMT9Oxxg@cluster0.u7xo6uh.mongodb.net/',
      {
        dbName: 'time-tracker',
      },
    ),
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'User', schema: UserSchema },
    ]),
    ConfigModule.forRoot(),
  ],

  controllers: [AppController, TaskController, UserController],
  providers: [AppService, TaskService, UserService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS credentials and/or region are missing from environment variables.',
      );
    }

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }
}
