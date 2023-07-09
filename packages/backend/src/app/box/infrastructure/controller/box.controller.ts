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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BoxService } from '../service/box.service';
import { BoxDTO, BoxListDTO } from '@fitbooking/contracts';

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

    createdBoxResult.mapErr<Error>(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put(':id/invite')
  @HttpCode(200)
  async inviteAthlete(
    @Param() parameters: { id: string },
    @Body(new ValidationPipe())
    inviteAthleteDTO: {
      email: string;
    },
  ) {
    const athleteInvited = await this.boxService.inviteAthlete(
      parameters.id,
      inviteAthleteDTO.email,
    );
    athleteInvited.mapErr<Error>(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put(':id/accept')
  @HttpCode(200)
  async acceptInvitation(
    @Param() parameters: { id: string },
    @Body(new ValidationPipe())
    acceptInvitationDTO: {
      email: string;
    },
  ) {
    const athleteConfirmed = await this.boxService.acceptInvitation(
      parameters.id,
      acceptInvitationDTO.email,
    );

    athleteConfirmed.mapErr<Error>(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() parameters: { id: string }): Promise<BoxDTO | undefined> {
    return await this.boxService.getBoxById(parameters.id);
  }

  @Get()
  async getByEmail(@Query('email') email: string): Promise<BoxListDTO> {
    return await this.boxService.getBoxesByEmail(email);
  }
}
