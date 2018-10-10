
const ThreadRepository = require('../data/OnMemoryRepository/ThreadRepository').default;
const UserRepository = require('../data/OnMemoryRepository/UserRepository').default;
const CreateThreadUseCase = require('../domain/usecase/CreateThreadUseCase').default;
const UserEntity = require('../domain/entity/User').default;

const threadRepository = new ThreadRepository();
const userRepository = new UserRepository();
let userA;
let userB;

beforeAll(async () => {
  ([userA, userB] = await Promise.all([
    userRepository.save(new UserEntity(null, 'A')),
    userRepository.save(new UserEntity(null, 'B')),
  ]));
});

test('Create Thread', async () => {
  const usecase = new CreateThreadUseCase(threadRepository, userRepository);

  const createdThread = await usecase.create('Hello, World', userA.getId());

  console.log(createdThread);
  expect(createdThread.getTitle()).toBe('Hello, World');
  expect(createdThread.getClosed()).toBe(false);
  expect(createdThread.getOwner().getId()).toBe(userA.getId());
  expect(createdThread.getOwner().getName()).toBe(userA.getName());
});
