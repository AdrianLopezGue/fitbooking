import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SessionService } from '../service/session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @HttpCode(200)
  async create(@Body(new ValidationPipe()) createSessionDTO: { maxCapacity: number }) {
    const createdSessionResult = await this.sessionService.createSession(
      createSessionDTO.maxCapacity,
    );

    createdSessionResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }
}
