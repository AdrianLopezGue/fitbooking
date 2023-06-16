import { InMemoryUserRepository } from '../../../infrastructure';
import { CreateUserCommand } from '../create-user.command';
import { CreateUserHandler } from '../create-user.handler';

describe('Create user handler', () => {
  it('should create a user', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const createUserHandler = new CreateUserHandler(userRepository);
    const userName = 'User Name';

    const result = await createUserHandler.execute(new CreateUserCommand(userName));

    expect(result.isOk()).toBe(true);

    const usersFound = await userRepository.findAll();
    expect(usersFound).toHaveLength(1);
    expect(usersFound[0].name.value).toBe(userName);
  });

  it('should should throw error if name is empty', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const bookSeatHandler = new CreateUserHandler(userRepository);
    const emptyUserName = '';

    await expect(
      bookSeatHandler.execute(new CreateUserCommand(emptyUserName)),
    ).rejects.toThrow(Error);
  });
});
