import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err } from 'neverthrow';
import { CreateBoxCommand } from './create-box.command';
import { Box } from '../../domain/model/box';
import { BoxRepository } from '../../domain/service/box.repository';
import { BoxName } from '../../domain/model/box-name';
import { UserId } from '../../../user';
import { UserRepository } from '../../../user/domain/service/user.repository';
import { User } from '../../../user/domain/model/user';
import { UserNotFoundError } from '../../../user/domain/error/user-not-found.error';
import { BoxLocation } from '../../domain/model/box-location';

@CommandHandler(CreateBoxCommand)
export class CreateBoxHandler implements ICommandHandler<CreateBoxCommand> {
  constructor(
    @InjectAggregateRepository(Box)
    private readonly boxRepository: BoxRepository,
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateBoxCommand): Promise<Result<Promise<void>, DomainError>> {
    const user = await this.userRepository.find(UserId.from(command.userId));

    if (!user) {
      return err(UserNotFoundError.causeUserDoesNotExist());
    }

    const boxData = Result.combine([
      BoxName.from(command.name),
      BoxLocation.from(command.location),
    ]);

    return boxData
      .andThen(boxData =>
        Box.add(boxData[0], boxData[1], user.id, user.email),
      )
      .map(box => this.boxRepository.save(box));
  }
}
