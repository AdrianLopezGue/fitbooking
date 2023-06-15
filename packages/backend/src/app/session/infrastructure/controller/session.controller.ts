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
import { SessionService } from '../service/session.service';
import { SessionDTO } from '../../application/service/session-finder.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) createSessionDTO: { maxCapacity: number }) {
    const createdSessionResult = await this.sessionService.createSession(
      createSessionDTO.maxCapacity,
    );

    createdSessionResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put()
  @HttpCode(200)
  async bookSeat(
    @Body(new ValidationPipe()) bookSeatDTO: { id: string; userId: string },
  ) {
    const bookSeatResult = await this.sessionService.bookSeat(
      bookSeatDTO.id,
      bookSeatDTO.userId,
    );

    bookSeatResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put()
  @HttpCode(200)
  async cancelSeat(
    @Body(new ValidationPipe()) cancelSeatSessionDTO: { id: string; userId: string },
  ) {
    const cancelSeatResult = await this.sessionService.cancelSeat(
      cancelSeatSessionDTO.id,
      cancelSeatSessionDTO.userId,
    );

    cancelSeatResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<SessionDTO | undefined> {
    return await this.sessionService.getSessionById(params.id);
  }
}
