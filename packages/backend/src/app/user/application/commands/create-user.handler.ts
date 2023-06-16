import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, ok } from 'neverthrow';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../domain/model/user';
import { UserRepository } from '../../domain/service/user.repository';
import { UserName } from '../../domain/model/user-name';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<Result<null, DomainError>> {
    const user = User.add(UserName.from(command.name));

    await this.userRepository.save(user);

    return ok(null);
  }
}
