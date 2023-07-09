import { AthleteListDTO, BoxDTO, BoxListDTO } from '@fitbooking/contracts';
import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from 'neverthrow';
import { AcceptInvitationCommand } from '../../application/command/accept-invitation.command';
import { CreateBoxCommand } from '../../application/command/create-box.command';
import { InviteAthleteCommand } from '../../application/command/invite-athlete.command';
import { GetBoxByIdQuery } from '../../application/query/get-box-by-id.query';
import { GetBoxesByEmailQuery } from '../../application/query/get-boxes-by-email.query';
import { GetAthletesByBoxQuery } from '../../application/query/get-athletes-by-box.query';

@Injectable()
export class BoxService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createBox(
    name: string,
    location: string,
    userId: string,
  ): Promise<Result<null, Error>> {
    return this.commandBus.execute<ICommand, Result<null, Error>>(
      new CreateBoxCommand(name, location, userId),
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

  async getBoxesByEmail(email: string): Promise<BoxListDTO> {
    return this.queryBus.execute<IQuery, BoxListDTO>(new GetBoxesByEmailQuery(email));
  }

  async getAthletesByBox(boxId: string): Promise<AthleteListDTO> {
    return this.queryBus.execute<IQuery, AthleteListDTO>(
      new GetAthletesByBoxQuery(boxId),
    );
  }
}
