import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Class } from 'src/classes/entities/class.entity';

export type GenderOptions = 'male' | 'female';
export const GenderOptionsArr: GenderOptions[] = ['male', 'female'];

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be at least 3 characters' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  @IsEnum(GenderOptionsArr)
  gender: string;

  @IsNotEmpty({ message: 'Class is required' })
  @IsNumber({}, { message: 'Class must be a number' })
  @Min(1)
  class: Class;
}
