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
import { SessionService } from '../service/session.service';
import { SessionDTO } from '@fitbooking/contracts';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe())
    createSessionDTO: {
      name: string;
      boxId: string;
      maxCapacity: number;
      date: Date;
    },
  ) {
    const createdSessionResult = await this.sessionService.createSession(
      createSessionDTO.name,
      createSessionDTO.boxId,
      createSessionDTO.maxCapacity,
      createSessionDTO.date,
    );

    createdSessionResult.mapErr<Error>(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put('book/:id')
  @HttpCode(200)
  async bookSeat(
    @Body(new ValidationPipe()) bookSeatDTO: { athleteId: string },
    @Param() parameters: { id: string },
  ) {
    const bookSeatResult = await this.sessionService.bookSeat(
      parameters.id,
      bookSeatDTO.athleteId,
    );

    bookSeatResult.mapErr<Error>(erorr => {
      throw new HttpException(erorr.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Put('cancel/:id')
  @HttpCode(200)
  async cancelSeat(
    @Body(new ValidationPipe()) cancelSeatSessionDTO: { athleteId: string },
    @Param() parameters: { id: string },
  ) {
    const cancelSeatResult = await this.sessionService.cancelSeat(
      parameters.id,
      cancelSeatSessionDTO.athleteId,
    );

    cancelSeatResult.mapErr<Error>(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() parameters: { id: string }): Promise<SessionDTO | undefined> {
    return await this.sessionService.getSessionById(parameters.id);
  }

  @Get()
  async getByDateAndBox(
    @Query('date') date: string,
    @Query('boxId') boxId: string,
  ): Promise<SessionDTO[] | undefined> {
    const parsedDate = new Date(date);
    return await this.sessionService.getSessionsByDateAndBox(parsedDate, boxId);
  }
}
