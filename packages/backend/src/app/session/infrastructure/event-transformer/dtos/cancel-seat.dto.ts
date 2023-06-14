import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CancelSeatDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly _id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly assistant: string;
}