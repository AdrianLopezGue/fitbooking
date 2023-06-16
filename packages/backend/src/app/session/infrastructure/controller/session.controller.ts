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
  async create(
    @Body(new ValidationPipe()) createSessionDTO: { name: string; maxCapacity: number },
  ) {
    const createdSessionResult = await this.sessionService.createSession(
      createSessionDTO.name,
      createSessionDTO.maxCapacity,
    );

    createdSessionResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put('book/:id')
  @HttpCode(200)
  async bookSeat(
    @Body(new ValidationPipe()) bookSeatDTO: { userId: string },
    @Param() params: { id: string },
  ) {
    const bookSeatResult = await this.sessionService.bookSeat(
      params.id,
      bookSeatDTO.userId,
    );

    bookSeatResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put('cancel/:id')
  @HttpCode(200)
  async cancelSeat(
    @Body(new ValidationPipe()) cancelSeatSessionDTO: { userId: string },
    @Param() params: { id: string },
  ) {
    const cancelSeatResult = await this.sessionService.cancelSeat(
      params.id,
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
