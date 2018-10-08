'use strict';
import ThreadEntity, {ThreadRepository} from '../entity/Thread';
import UserEntity, {UserRepository} from "../entity/User";

export default class CreateThreadUseCase {
  constructor(private threadRepository: ThreadRepository, private userRepository: UserRepository) {}

  async create(title: string, createById: string): Promise<ThreadEntity> {
    const createBy: UserEntity = await this.userRepository.getById(createById);

    const thread: ThreadEntity = new ThreadEntity(null, title, createBy, false);
    await this.threadRepository.save(thread);

    return thread;
  }
};
