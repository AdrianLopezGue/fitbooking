import { InMemoryUserRepository } from '../../../infrastructure';
import { InMemoryUserFinder } from '../../../infrastructure/service/in-memory-user.finder';
import { CreateUserCommand } from '../create-user.command';
import { CreateUserHandler } from '../create-user.handler';
import { UserBuilder } from '../../../../test/user.builder';
import { UserSecurity } from '../../service/user-security.service';

describe('Create user handler', () => {
  let userSecurity: UserSecurity;

  beforeEach(() => {
    userSecurity = {
      encodePassword: jest.fn().mockResolvedValue('encodedPassword'),
    };
  });

  it('should create a user and encode password', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder();
    const createUserHandler = new CreateUserHandler(
      userRepository,
      userFinder,
      userSecurity,
    );
    const userName = 'User Name';
    const userEmail = 'test@test.com';
    const password = 'Ultra secret password';

    const result = await createUserHandler.execute(
      new CreateUserCommand(userName, userEmail, password),
    );

    expect(result.isOk()).toBe(true);

    const usersFound = await userRepository.findAll();
    expect(usersFound).toHaveLength(1);
    expect(usersFound[0].name.value).toBe(userName);
    expect(usersFound[0].email.value).toBe(userEmail);
    expect(usersFound[0].password.value).not.toBe(password);
  });

  it('should return error if user with given email is already created', async () => {
    const userEmail = 'test@test.com';
    const user = new UserBuilder().withEmail(userEmail).build();
    const userRepository = new InMemoryUserRepository([user]);
    const userFinder = new InMemoryUserFinder([user]);
    const createUserHandler = new CreateUserHandler(
      userRepository,
      userFinder,
      userSecurity,
    );

    const result = await createUserHandler.execute(
      new CreateUserCommand(user.name.value, userEmail, user.password.value),
    );

    expect(result.isErr()).toBe(true);
  });

  it('should should throw error if name is empty', async () => {
    const userRepository = new InMemoryUserRepository([]);
    const userFinder = new InMemoryUserFinder();
    const bookSeatHandler = new CreateUserHandler(
      userRepository,
      userFinder,
      userSecurity,
    );
    const emptyUserName = '';
    const userEmail = 'test@test.com';
    const password = 'Ultra secret password';

    await expect(
      bookSeatHandler.execute(new CreateUserCommand(emptyUserName, userEmail, password)),
    ).rejects.toThrow(Error);
  });
});
