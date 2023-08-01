import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user';
import { IUser } from 'src/interface/user.interface';
import * as AWS from 'aws-sdk';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModal: Model<IUser>) {}

  //create User
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModal(createUserDto);
    const savedUser = await newUser.save();

    // Trigger Cognito User Pool addition
    await this.addUserToCognito(savedUser.email, savedUser.emailInvite);

    return savedUser;
  }

  //getUser  < - get single or particular task
  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModal.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with #${userId} id not found`);
    }
    return existingUser;
  }

  async addUserToCognito(email: string, emailInvite: boolean): Promise<void> {
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();

    const params = {
      UserPoolId: 'ap-south-1_yvZf7Wlvn',
      Username: email,
      MessageAction: emailInvite === true ? null : 'SUPPRESS',
    };

    return new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.adminCreateUser(params, (err, data) => {
        if (err) {
          console.error('Error adding user to Cognito User Pool:', err);
          reject(err);
        } else {
          console.log('User added to Cognito User Pool:', data);
          resolve();
        }
      });
    });
  }
}
