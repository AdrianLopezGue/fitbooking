import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BoxService } from '../service/box.service';
import { BoxDTO } from '../../application/service/box-finder.service';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe())
    createBoxDTO: {
      name: string;
      userId: string;
    },
  ) {
    const createdBoxResult = await this.boxService.createBox(
      createBoxDTO.name,
      createBoxDTO.userId,
    );

    createdBoxResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put(':id/invite')
  @HttpCode(200)
  async inviteAthlete(
    @Param() params: { id: string },
    @Body(new ValidationPipe())
    inviteAthleteDTO: {
      email: string;
    },
  ) {
    const athleteInvited = await this.boxService.inviteAthlete(
      params.id,
      inviteAthleteDTO.email,
    );
    athleteInvited.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put(':id/accept')
  @HttpCode(200)
  async acceptInvitation(
    @Param() params: { id: string },
    @Body(new ValidationPipe())
    acceptInvitationDTO: {
      email: string;
    },
  ) {
    const athleteConfirmed = await this.boxService.acceptInvitation(
      params.id,
      acceptInvitationDTO.email,
    );

    athleteConfirmed.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<BoxDTO | undefined> {
    return await this.boxService.getBoxById(params.id);
  }
}
