import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { SessionDTO } from '../../application/service/session-finder.service';

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

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<SessionDTO | undefined> {
    return await this.sessionService.getSessionById(params.id);
  }
}
