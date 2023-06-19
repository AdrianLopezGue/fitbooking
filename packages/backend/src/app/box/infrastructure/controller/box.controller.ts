import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BoxService } from '../service/box.service';

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
}
