import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result, ok } from 'neverthrow';
import { CreateBoxCommand } from './create-box.command';
import { Box } from '../../domain/model/box';
import { BoxRepository } from '../../domain/service/box.repository';
import { BoxName } from '../../domain/model/box-name';

@CommandHandler(CreateBoxCommand)
export class CreateBoxHandler implements ICommandHandler<CreateBoxCommand> {
  constructor(
    @InjectAggregateRepository(Box)
    private readonly boxRepository: BoxRepository,
  ) {}

  async execute(command: CreateBoxCommand): Promise<Result<null, DomainError>> {
    const box = Box.add(BoxName.from(command.name));

    await this.boxRepository.save(box);

    return ok(null);
  }
}
