import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be at least 3 characters' })
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  @Length(3, 255, { message: 'Email must be at most 255 characters' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 255, { message: 'Password must be at least 8 characters' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User type is required' })
  @IsEnum(UserType, { message: 'Invalid user type' })
  user_type: number;
}
