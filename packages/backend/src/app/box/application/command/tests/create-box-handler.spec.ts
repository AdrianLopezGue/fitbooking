import { InMemoryBoxRepository } from '../../../infrastructure/repository/in-memory-box.repository';
import { InMemoryUserRepository } from '../../../../user/infrastructure/repository/in-memory-user.repository';
import { CreateBoxCommand } from '../create-box.command';
import { CreateBoxHandler } from '../create-box.handler';
import { AthleteRolesEnum } from '../../../domain/model/athlete-role';
import { UserBuilder } from '../../../../test/user.builder';
import { BoxNameCannotBeEmpty } from '../../../domain/error/box-name-cannot-be-empty.error';
import { BoxLocationCannotBeEmpty } from '../../../domain/error/box-location-cannot-be-empty.error';
import { UserNotFoundError } from '../../../../user/domain/error/user-not-found.error';

describe('Create box handler', () => {
  it('should create a box', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const userRepository = new InMemoryUserRepository([user]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository, userRepository);
    const boxName = 'Box Name';
    const boxLocation = 'Spain';

    const result = await bookSeatHandler.execute(
      new CreateBoxCommand(boxName, boxLocation, user.id.value),
    );

    expect(result.isOk()).toBe(true);

    const boxesFound = await boxRepository.findAll();
    expect(boxesFound).toHaveLength(1);
    expect(boxesFound[0].name.value).toBe(boxName);
    expect(boxesFound[0].location.value).toBe(boxLocation);
    expect(boxesFound[0].athletes).toHaveLength(1);
    expect(boxesFound[0].athletes[0].role.value).toBe(AthleteRolesEnum.ADMIN);
    expect(boxesFound[0].athletes[0].userId.value).toBe(user.id.value);
  });

  it('should return error if user is not found', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const userRepository = new InMemoryUserRepository([]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository, userRepository);

    const result = await bookSeatHandler.execute(
      new CreateBoxCommand('Box Name', 'Spain', user.id.value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(UserNotFoundError);
  });

  it('should return error if name is empty', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const userRepository = new InMemoryUserRepository([user]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository, userRepository);
    const emptyBoxName = '';

    const result = await bookSeatHandler.execute(
      new CreateBoxCommand(emptyBoxName, 'Spain', user.id.value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(BoxNameCannotBeEmpty);
  });

  it('should return error if location is empty', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const userRepository = new InMemoryUserRepository([user]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository, userRepository);
    const boxName = 'Box Name';
    const emptyBoxLocation = '';

    const result = await bookSeatHandler.execute(
      new CreateBoxCommand(boxName, emptyBoxLocation, user.id.value),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr()).toBeInstanceOf(BoxLocationCannotBeEmpty);
  });
});
