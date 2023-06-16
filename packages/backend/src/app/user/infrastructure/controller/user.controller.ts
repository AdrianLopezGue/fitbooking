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
import { UserDTO } from '../../application/service/user-finder.service';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) createUserDTO: { name: string }) {
    const createdUserResult = await this.userService.createUser(createUserDTO.name);

    createdUserResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<UserDTO | undefined> {
    return await this.userService.getUserById(params.id);
  }
}
