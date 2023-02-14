import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(80)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(120)
  lastName: string;
}
