import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InviteAthleteCommand } from './invite-athlete.command';
import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Box } from '../../domain/model/box';
import { BoxRepository } from '../../domain/service/box.repository';
import { Result, err, ok } from 'neverthrow';
import { BoxId } from '../../domain/model/box-id';
import { UserEmail } from '../../../user/domain/model/user-email';
import { BoxNotFoundError } from '../../domain/error/box-not-found.error';

@CommandHandler(InviteAthleteCommand)
export class InviteAthleteHandler implements ICommandHandler<InviteAthleteCommand> {
  constructor(
    @InjectAggregateRepository(Box) private readonly boxRepository: BoxRepository,
  ) {}

  async execute(command: InviteAthleteCommand): Promise<Result<undefined, DomainError>> {
    const box = await this.boxRepository.find(BoxId.from(command.boxId));

    if (!box) {
      return err(BoxNotFoundError.causeBoxDoesNotExist());
    }

    const result = box.addAthlete(UserEmail.from(command.email));
    if (result.isErr()) {
      return result;
    }

    await this.boxRepository.save(box);
    return ok(undefined);
  }
}
