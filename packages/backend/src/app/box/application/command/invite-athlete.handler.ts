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

@CommandHandler(InviteAthleteCommand)
export class InviteAthleteHandler implements ICommandHandler<InviteAthleteCommand> {
  constructor(
    @InjectAggregateRepository(Box) private readonly boxRepository: BoxRepository,
  ) {}

  async execute(command: InviteAthleteCommand): Promise<Result<null, DomainError>> {
    const box = await this.boxRepository.find(BoxId.from(command.boxId));

    if (!box) {
      return err(new Error("Box not found"));
    }

    const res = box.addAthlete(UserEmail.from(command.email));
    if (res.isErr()) {
      return res;
    }

    await this.boxRepository.save(box);
    return ok(null);
  }
}
