'use strict';

import ThreadEntity, {ThreadRepository as IThreadRepository} from '../../domain/entity/Thread';

export default class ThreadRepository implements IThreadRepository {
  private data: Array<ThreadEntity>;

  constructor() {
    this.data = [];
  }
  async getById(id: string): Promise<ThreadEntity> {
    const thread = this.data.find(thread => thread.getId() === id);
    if (thread == null) {
      throw new Error('Thread Not Found');
    }
    return thread;
  }
  async getAllThreads(): Promise<Array<ThreadEntity>> {
    return this.data;
  }
  async save(thread: ThreadEntity): Promise<void> {
    if (thread.getId()) {
      const index = this.data.findIndex(thread2 => thread.getId() === thread2.getId());
      if (index !== -1) {
        this.data.splice(index, 1, thread);
      }
      else {
        this.data.push(thread);
      }
      return;
    }

    const id = Math.floor(Math.random() * (2 ** 32)).toString(16);
    const newThread = new ThreadEntity(id, thread.getTitle(), thread.getOwner(), thread.getClosed());
    this.data.push(newThread);
    return;
  }
}
