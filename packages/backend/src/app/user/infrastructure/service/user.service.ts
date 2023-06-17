import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { UserDTO } from '../../application/service/user-finder.service';
import { GetUserByIdQuery } from '../../application/query/get-user-by-id.query';
import { CreateUserCommand } from '../../application/commands/create-user.command';

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
}
