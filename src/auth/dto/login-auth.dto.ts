import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  @Length(3, 255, { message: 'Email must be at most 255 characters' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 255, { message: 'Password must be at least 8 characters' })
  password: string;
}
