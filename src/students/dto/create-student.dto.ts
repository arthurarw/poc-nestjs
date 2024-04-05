import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export type GenderOptions = 'male' | 'female';
export const GenderOptionsArr: GenderOptions[] = ['male', 'female'];

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be at least 3 characters' })
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  @IsEnum(GenderOptionsArr)
  gender: string;
}
