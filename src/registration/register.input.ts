import { IsAlphanumeric, IsEmail, Length, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '../user/user.entity';

@InputType()
export class RegisterInput {
  @Field()
  @MaxLength(60)
  firstName: string;

  @MaxLength(60)
  lastName: string;

  @Field(() => Gender)
  gender: Gender;

  @MaxLength(30)
  @IsAlphanumeric()
  username: string;

  @IsEmail()
  email: string;

  @Length(8, 30)
  password: string;
}