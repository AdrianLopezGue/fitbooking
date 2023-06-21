import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AcceptInvitationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly athleteId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly boxId: string;
}
