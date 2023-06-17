import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly _id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
