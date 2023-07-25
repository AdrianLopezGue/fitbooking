import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InviteAthleteCommand } from './invite-athlete.command';
import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Box } from '../../domain/model/box';
import { BoxRepository } from '../../domain/service/box.repository';
import { Result, err } from 'neverthrow';
import { BoxId } from '../../domain/model/box-id';
import { UserEmail } from '../../../user/domain/model/user-email';
import { BoxNotFoundError } from '../../domain/error/box-not-found.error';

@CommandHandler(InviteAthleteCommand)
export class InviteAthleteHandler implements ICommandHandler<InviteAthleteCommand> {
  constructor(
    @InjectAggregateRepository(Box) private readonly boxRepository: BoxRepository,
  ) {}

  async execute(command: InviteAthleteCommand): Promise<Result<Promise<void>, DomainError>> {
    const box = await this.boxRepository.find(BoxId.from(command.boxId));

    if (!box) {
      return err(BoxNotFoundError.causeBoxDoesNotExist());
    }

    return box
      .addAthlete(UserEmail.from(command.email))
      .map(box => this.boxRepository.save(box));
  }
}
