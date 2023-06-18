import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBoxDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly _id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
}
