'use strict';

import CommentEntity, {CommentRepository} from '../entity/Comment';
import ThreadEntity, {ThreadRepository} from "../entity/Thread";
import UserEntity, {UserRepository} from "../entity/User";

export default class PostCommentUseCase {
  constructor(private commentRepository: CommentRepository, private threadRepository: ThreadRepository, private userRepository: UserRepository) {}

  async post(message: string, toThreadId: string, byUserId: string): Promise<CommentEntity> {
    const to: ThreadEntity = await this.threadRepository.getById(toThreadId);
    const by: UserEntity = await this.userRepository.getById(byUserId);

    const comment: CommentEntity = new CommentEntity(null, message, to, by, new Date());

    await this.commentRepository.save(comment);

    return comment;
  }
}
