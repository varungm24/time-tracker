import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly userName: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  readonly role: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly emailInvite: boolean;
}
