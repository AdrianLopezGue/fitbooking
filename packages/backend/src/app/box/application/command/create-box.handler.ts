import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, err, ok } from 'neverthrow';
import { CreateBoxCommand } from './create-box.command';
import { Box } from '../../domain/model/box';
import { BoxRepository } from '../../domain/service/box.repository';
import { BoxName } from '../../domain/model/box-name';
import { UserId } from '../../../user';
import { UserRepository } from '../../../user/domain/service/user.repository';
import { User } from '../../../user/domain/model/user';

@CommandHandler(CreateBoxCommand)
export class CreateBoxHandler implements ICommandHandler<CreateBoxCommand> {
  constructor(
    @InjectAggregateRepository(Box)
    private readonly boxRepository: BoxRepository,
    @InjectAggregateRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateBoxCommand): Promise<Result<null, DomainError>> {
    const user = await this.userRepository.find(UserId.from(command.userId));

    if (!user) {
      return err(new Error());
    }

    const box = Box.add(BoxName.from(command.name), user.id, user.email);

    await this.boxRepository.save(box);

    return ok(null);
  }
}
