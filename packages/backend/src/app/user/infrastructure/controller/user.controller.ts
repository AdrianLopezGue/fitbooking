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
import { Public } from '../../../auth/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe())
    createUserDTO: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    const createdUserResult = await this.userService.createUser(
      createUserDTO.name,
      createUserDTO.email,
      createUserDTO.password,
    );

    createdUserResult.mapErr<Error>(err => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<UserDTO | undefined> {
    return await this.userService.getUserById(params.id);
  }
}
