'use strict';

import ThreadEntity, {ThreadRepository} from '../entity/Thread';

export default class SearchThreadUseCase {
  constructor(private threadRepository: ThreadRepository) {}

  async search(): Promise<Array<ThreadEntity>> {
    return this.threadRepository.getAllThreads();
  }
}
