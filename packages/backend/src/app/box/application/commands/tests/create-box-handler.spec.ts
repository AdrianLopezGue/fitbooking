import { InMemoryBoxRepository } from '../../../infrastructure/repository/in-memory-box.repository';
import { CreateBoxCommand } from '../create-box.command';
import { CreateBoxHandler } from '../create-box.handler';
import { AthleteRolesEnum } from '../../../domain/model/athlete-role';
import { UserId } from '../../../../user/domain/model/user-id';

describe('Create box handler', () => {
  it('should create a box', async () => {
    const boxRepository = new InMemoryBoxRepository([]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository);
    const boxName = 'Box Name';
    const userId = UserId.generate().value;

    const result = await bookSeatHandler.execute(new CreateBoxCommand(boxName, userId));

    expect(result.isOk()).toBe(true);

    const boxsFound = await boxRepository.findAll();
    expect(boxsFound).toHaveLength(1);
    expect(boxsFound[0].name.value).toBe(boxName);
    expect(boxsFound[0].athletes).toHaveLength(1);
    expect(boxsFound[0].athletes[0].role.value).toBe(AthleteRolesEnum.ADMIN);
    expect(boxsFound[0].athletes[0].userId.value).toBe(userId);
  });

  it('should should throw error if name is empty', async () => {
    const boxRepository = new InMemoryBoxRepository([]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository);
    const emptyBoxName = '';
    const userId = UserId.generate().value;

    await expect(
      bookSeatHandler.execute(new CreateBoxCommand(emptyBoxName, userId)),
    ).rejects.toThrow(Error);
  });
});
