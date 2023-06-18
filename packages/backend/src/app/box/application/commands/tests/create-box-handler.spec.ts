import { InMemoryBoxRepository } from '../../../infrastructure/repository/in-memory-box.repository';
import { CreateBoxCommand } from '../create-box.command';
import { CreateBoxHandler } from '../create-box.handler';

describe('Create box handler', () => {
  it('should create a box', async () => {
    const boxRepository = new InMemoryBoxRepository([]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository);
    const boxName = 'Box Name';

    const result = await bookSeatHandler.execute(new CreateBoxCommand(boxName));

    expect(result.isOk()).toBe(true);

    const boxsFound = await boxRepository.findAll();
    expect(boxsFound).toHaveLength(1);
    expect(boxsFound[0].name.value).toBe(boxName);
  });

  it('should should throw error if name is empty', async () => {
    const boxRepository = new InMemoryBoxRepository([]);
    const bookSeatHandler = new CreateBoxHandler(boxRepository);
    const emptyBoxName = '';

    await expect(
      bookSeatHandler.execute(new CreateBoxCommand(emptyBoxName)),
    ).rejects.toThrow(Error);
  });
});
