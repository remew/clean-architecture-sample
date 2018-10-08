'use strict';
import ThreadEntity, {ThreadRepository} from '../entity/Thread';
import UserEntity, {UserRepository} from '../entity/User';

export default class CloseThreadUseCase {
  constructor(private threadRepository: ThreadRepository, private userRepository: UserRepository) {}

  async close(threadId: string, closeById: string): Promise<ThreadEntity> {
    const thread: ThreadEntity = await this.threadRepository.getById(threadId);
    const closeByUser: UserEntity = await this.userRepository.getById(closeById);

    if (!thread.isCreatedBy(closeByUser)) {
      throw new Error('');
    }

    thread.close();
    await this.threadRepository.save(thread);

    return thread;
  }
};
