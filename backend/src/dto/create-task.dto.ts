import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly project: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly task: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly start: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly end: string;
}
