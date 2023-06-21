import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { CreateBoxCommand } from '../../application/command/create-box.command';
import { BoxDTO } from '../../application/service/box-finder.service';
import { GetBoxByIdQuery } from '../../application/query/get-box-by-id.query';
import { InviteAthleteCommand } from '../../application/command/invite-athlete.command';
import { AcceptInvitationCommand } from '../../application/command/accept-invitation.command';

@Injectable()
export class BoxService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createBox(name: string, userId: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateBoxCommand(name, userId),
    );
  }

  async inviteAthlete(boxId: string, email: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new InviteAthleteCommand(boxId, email),
    );
  }

  async acceptInvitation(boxId: string, email: string): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new AcceptInvitationCommand(email, boxId),
    );
  }

  async getBoxById(id: string): Promise<BoxDTO> {
    return this.queryBus.execute<IQuery, BoxDTO>(new GetBoxByIdQuery(id));
  }
}
