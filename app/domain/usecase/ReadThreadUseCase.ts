'use strict';

import ThreadEntity, {ThreadRepository} from '../entity/Thread';
import CommentEntity, {CommentRepository} from "../entity/Comment";

export default class ReadThreadUseCase {
  constructor(private threadRepository: ThreadRepository, private commentRepository: CommentRepository) {}

  async read(threadId: string): Promise<{thread: ThreadEntity, comments: Array<CommentEntity>}> {
    const thread = await this.threadRepository.getById(threadId);
    const comments = await this.commentRepository.getAllComments(threadId);

    return {
      thread,
      comments,
    };
  }
}
