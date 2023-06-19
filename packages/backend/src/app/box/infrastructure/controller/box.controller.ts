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

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<BoxDTO | undefined> {
    return await this.boxService.getBoxById(params.id);
  }
}