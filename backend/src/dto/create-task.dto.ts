import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly project: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly task: string;
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly start: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly end: string;
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly duration: string;
}
