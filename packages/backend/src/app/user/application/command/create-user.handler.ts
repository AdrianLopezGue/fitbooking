import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, ResultAsync, err } from 'neverthrow';
import { UserAlreadyExistsError } from '../../domain/error/user-already-exists.error';
import { Password } from '../../domain/model/password';
import { User } from '../../domain/model/user';
import { UserEmail } from '../../domain/model/user-email';
import { UserName } from '../../domain/model/user-name';
import { UserRepository } from '../../domain/service/user.repository';
import { USER_FINDER, UserFinder } from '../service/user-finder.service';
import { USER_SECURITY, UserSecurity } from '../service/user-security.service';
import { CreateUserCommand } from './create-user.command';

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

  async execute(command: CreateUserCommand): Promise<Result<void, DomainError>> {
    const userExists = await this.userFinder.findByEmail(command.email);

    if (userExists) {
      return err(UserAlreadyExistsError.causeUserAlreadyExists(command.email));
    }

    const userData = ResultAsync.combine([
      UserName.from(command.name).asyncMap(value => Promise.resolve(value)),
      Password.from(command.password).asyncMap(password =>
        this.userSecurity.encodePassword(password),
      ),
    ]);

    return userData
      .map(userData => User.add(userData[0], UserEmail.from(command.email), userData[1]))
      .map(user => this.userRepository.save(user));
  }
}
