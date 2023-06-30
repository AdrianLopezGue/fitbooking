import { InMemoryBoxRepository } from '../../../infrastructure/repository/in-memory-box.repository';
import { InMemoryUserRepository } from '../../../../user/infrastructure/repository/in-memory-user.repository';
import { CreateBoxCommand } from '../create-box.command';
import { CreateBoxHandler } from '../create-box.handler';
import { AthleteRolesEnum } from '../../../domain/model/athlete-role';
import { UserBuilder } from '../../../../test/user.builder';

describe('Create box handler', () => {
  it('should create a box', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const userRepository = new InMemoryUserRepository([user]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository, userRepository);
    const boxName = 'Box Name';

    const result = await bookSeatHandler.execute(
      new CreateBoxCommand(boxName, user.id.value),
    );

    expect(result.isOk()).toBe(true);

    const boxesFound = await boxRepository.findAll();
    expect(boxesFound).toHaveLength(1);
    expect(boxesFound[0].name.value).toBe(boxName);
    expect(boxesFound[0].athletes).toHaveLength(1);
    expect(boxesFound[0].athletes[0].role.value).toBe(AthleteRolesEnum.ADMIN);
    expect(boxesFound[0].athletes[0].userId.value).toBe(user.id.value);
  });

  it('should should throw error if name is empty', async () => {
    const user = new UserBuilder().build();
    const boxRepository = new InMemoryBoxRepository([]);
    const userRepository = new InMemoryUserRepository([user]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository, userRepository);
    const emptyBoxName = '';

    await expect(
      bookSeatHandler.execute(new CreateBoxCommand(emptyBoxName, user.id.value)),
    ).rejects.toThrow(Error);
  });
});
