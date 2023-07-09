import { UserDTO } from '@fitbooking/contracts';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '../../../auth/public.decorator';
import { UserService } from '../service/user.service';

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

    createdUserResult.mapErr<Error>(error => {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Get(':id')
  async getById(@Param() parameters: { id: string }): Promise<UserDTO | undefined> {
    return await this.userService.getUserById(parameters.id);
  }

  @Get()
  async getByEmail(@Query('email') email: string): Promise<UserDTO | undefined> {
    const response = await this.userService.getUserByEmail(email);
    return response;
  }
}
