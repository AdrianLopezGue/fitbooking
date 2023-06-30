import { UserDTO } from '@fitbooking/contracts';
import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateUserCommand } from '../../application/command/create-user.command';
import { GetUserByEmailQuery } from '../../application/query/get-user-by-email.query';
import { GetUserByIdQuery } from '../../application/query/get-user-by-id.query';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateUserCommand(name, email, password),
    );
  }

  async getUserById(id: string): Promise<UserDTO> {
    return this.queryBus.execute<IQuery, UserDTO>(new GetUserByIdQuery(id));
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    return this.queryBus.execute<IQuery, UserDTO>(new GetUserByEmailQuery(email));
  }
}
