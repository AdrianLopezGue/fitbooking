import { InMemoryBoxRepository } from '../../../infrastructure/repository/in-memory-box.repository';
import { UserBuilder } from '../../../../test/user.builder';
import { BoxBuilder } from '../../../../test/box.builder';
import { AthleteBuilder } from '../../../../test/athlete.builder';
import { AcceptInvitationCommand } from '../accept-invitation.command';
import { AcceptInvitationHandler } from '../accept-invitation.handler';
import { InMemoryUserFinder } from '../../../../user/infrastructure/service/in-memory-user.finder';
import { BoxId } from '../../../domain/model/box-id';
import { UserEmail } from '../../../../user/domain/model/user-email';
import { UserNotFoundError } from '../../../../user/domain/error/user-not-found.error';
import { BoxNotFoundError } from '../../../domain/error/box-not-found.error';
import { PendingAthleteNotFoundError } from '../../../domain/error/pending-athlete-not-found.error';
import { AthleteIsAlreadyConfirmedError } from '../../../domain/error/athlete-already-confirmed.error';

describe('Accept invitation handler', () => {
  it('should accept a pending invitation', async () => {
    const user = new UserBuilder().build();
    const pendingAthlete = new AthleteBuilder().withEmail(user.email.value).build();
    const box = new BoxBuilder().withAthletes([pendingAthlete]).build();

    const userFinder = new InMemoryUserFinder([user]);
    const boxRepository = new InMemoryBoxRepository([box]);
    const handler = new AcceptInvitationHandler(boxRepository, userFinder);

    const result = await handler.execute(
      new AcceptInvitationCommand(user.email.value, box.id.value),
    );

    expect(result.isOk()).toBe(true);

    const boxFound = await boxRepository.find(box.id);
    expect(boxFound.athletes[0].userId.value).toBe(user.id.value);
  });

  it('should return error if box is not found', async () => {
    const user = new UserBuilder().build();

    const userFinder = new InMemoryUserFinder([user]);
    const boxRepository = new InMemoryBoxRepository([]);
    const handler = new AcceptInvitationHandler(boxRepository, userFinder);

    const result = await handler.execute(
      new AcceptInvitationCommand(user.email.value, BoxId.generate().value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(BoxNotFoundError);
  });

  it('should return error if user is not found', async () => {
    const box = new BoxBuilder().build();

    const userFinder = new InMemoryUserFinder([]);
    const boxRepository = new InMemoryBoxRepository([box]);
    const handler = new AcceptInvitationHandler(boxRepository, userFinder);

    const result = await handler.execute(
      new AcceptInvitationCommand(UserEmail.from('random@email.com').value, box.id.value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(UserNotFoundError);
  });

  it('should return error if user is not an athlete', async () => {
    const user = new UserBuilder().build();
    const box = new BoxBuilder().withAthletes([]).build();

    const userFinder = new InMemoryUserFinder([user]);
    const boxRepository = new InMemoryBoxRepository([box]);
    const handler = new AcceptInvitationHandler(boxRepository, userFinder);

    const result = await handler.execute(
      new AcceptInvitationCommand(user.email.value, box.id.value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(PendingAthleteNotFoundError);
  });

  it('should return error if user is already confirmed', async () => {
    const user = new UserBuilder().build();
    const athlete = new AthleteBuilder()
      .withEmail(user.email.value)
      .withUserId(user.id.value)
      .build();
    const box = new BoxBuilder().withAthletes([athlete]).build();

    const userFinder = new InMemoryUserFinder([user]);
    const boxRepository = new InMemoryBoxRepository([box]);
    const handler = new AcceptInvitationHandler(boxRepository, userFinder);

    const result = await handler.execute(
      new AcceptInvitationCommand(user.email.value, box.id.value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(AthleteIsAlreadyConfirmedError);
  });
});
