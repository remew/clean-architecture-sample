'use strict';

import CommentEntity, {CommentRepository as ICommentRepository} from '../../domain/entity/Comment';

export default class CommentRepository implements ICommentRepository {
  private data: Array<CommentEntity>;

  constructor() {
    this.data = [];
  }
  async getById(id: string): Promise<CommentEntity> {
    const comment = this.data.find(comment => comment.getId() === id);
    if (comment == null) {
      throw new Error('Comment Not Found');
    }
    return comment;
  }
  async getAllComments(threadId: string): Promise<Array<CommentEntity>> {
    return this.data.filter(comment => comment.getPostTo().getId() === threadId);
  }
  async save(comment: CommentEntity): Promise<void> {
    if (comment.getId()) {
      const index = this.data.findIndex(comment2 => comment.getId() === comment2.getId());
      if (index !== -1) {
        this.data.splice(index, 1, comment);
      }
      else {
        this.data.push(comment);
      }
      return;
    }

    const id = Math.floor(Math.random() * (2 ** 32)).toString(16);
    const newComment = new CommentEntity(id, comment.getMessage(), comment.getPostTo(), comment.getPostBy(), comment.getPostedOn());
    this.data.push(newComment);
    return;
  }
}
