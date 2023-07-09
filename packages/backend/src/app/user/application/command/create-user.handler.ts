import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err, ok } from 'neverthrow';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../domain/model/user';
import { UserRepository } from '../../domain/service/user.repository';
import { UserName } from '../../domain/model/user-name';
import { UserEmail } from '../../domain/model/user-email';
import { Password } from '../../domain/model/password';
import { USER_SECURITY, UserSecurity } from '../service/user-security.service';
import { Inject } from '@nestjs/common';
import { USER_FINDER, UserFinder } from '../service/user-finder.service';
import { UserAlreadyExistsError } from '../../domain/error/user-already-exists.error';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository,
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
    @Inject(USER_SECURITY)
    private readonly userSecurity: UserSecurity,
  ) {}

  async execute(command: CreateUserCommand): Promise<Result<undefined, DomainError>> {
    const userExists = await this.userFinder.findByEmail(command.email);

    if (userExists) {
      return err(UserAlreadyExistsError.causeUserAlreadyExists(command.email));
    }

    const encodePassword = await this.userSecurity.encodePassword(command.password);

    const user = User.add(
      UserName.from(command.name),
      UserEmail.from(command.email),
      Password.from(encodePassword),
    );

    await this.userRepository.save(user);

    return ok(undefined);
  }
}
