import { InMemoryBoxRepository } from '../../../infrastructure/repository/in-memory-box.repository';
import { InviteAthleteHandler } from '../invite-athlete.handler';
import { UserBuilder } from '../../../../test/user.builder';
import { BoxBuilder } from '../../../../test/box.builder';
import { InviteAthleteCommand } from '../invite-athlete.command';
import { BoxId } from '../../../domain/model/box-id';
import { Athlete } from '../../../domain/model/athlete';
import { AthleteId } from '../../../domain/model/athlete-id';
import { AthleteRole } from '../../../domain/model/athlete-role';

describe('Invite athlete handler', () => {
  it('should invite an athlete', async () => {
    const user = new UserBuilder().build();
    const box = new BoxBuilder().build();
    const boxRepository = new InMemoryBoxRepository([box]);
    const handler = new InviteAthleteHandler(boxRepository);

    const result = await handler.execute(
      new InviteAthleteCommand(box.id.value, user.email.value),
    );

    expect(result.isOk()).toBe(true);

    const boxesFound = await boxRepository.findAll();
    expect(boxesFound).toHaveLength(1);
    expect(boxesFound[0].athletes).toHaveLength(1);
    expect(boxesFound[0].athletes[0].email.value).toBe(user.email.value);
  });

  it('should return error if box is not found', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const handler = new InviteAthleteHandler(boxRepository);

    const result = await handler.execute(
      new InviteAthleteCommand(BoxId.generate().value, user.email.value),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should return error if email belongs to a current athlete in box', async () => {
    const user = new UserBuilder().build();
    const box = new BoxBuilder()
      .withAthletes([
        new Athlete(AthleteId.generate(), user.email, undefined, AthleteRole.basic()),
      ])
      .build();
    const boxRepository = new InMemoryBoxRepository([box]);
    const handler = new InviteAthleteHandler(boxRepository);

    const result = await handler.execute(
      new InviteAthleteCommand(BoxId.generate().value, user.email.value),
    );

    expect(result.isErr()).toBe(true);
  });
});
