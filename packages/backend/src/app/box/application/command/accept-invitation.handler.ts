import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  DomainError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Box } from '../../domain/model/box';
import { BoxRepository } from '../../domain/service/box.repository';
import { Result, err } from 'neverthrow';
import { BoxId } from '../../domain/model/box-id';
import { UserEmail } from '../../../user/domain/model/user-email';
import { AcceptInvitationCommand } from './accept-invitation.command';
import {
  USER_FINDER,
  UserFinder,
} from '../../../user/application/service/user-finder.service';
import { Inject } from '@nestjs/common';
import { UserNotFoundError } from '../../../user/domain/error/user-not-found.error';
import { UserId } from '../../../user';
import { BoxNotFoundError } from '../../domain/error/box-not-found.error';

@CommandHandler(AcceptInvitationCommand)
export class AcceptInvitationHandler implements ICommandHandler<AcceptInvitationCommand> {
  constructor(
    @InjectAggregateRepository(Box) private readonly boxRepository: BoxRepository,
    @Inject(USER_FINDER)
    private readonly userFinder: UserFinder,
  ) {}

  async execute(
    command: AcceptInvitationCommand,
  ): Promise<Result<Promise<void>, DomainError>> {
    const box = await this.boxRepository.find(BoxId.from(command.boxId));

    if (!box) {
      return err(BoxNotFoundError.causeBoxDoesNotExist());
    }

    const user = await this.userFinder.findByEmail(command.email);

    if (!user) {
      return err(UserNotFoundError.causeUserDoesNotExist());
    }

    return box
      .acceptInvitation(UserEmail.from(user.email), UserId.from(user._id))
      .map(box => this.boxRepository.save(box));
  }
}
