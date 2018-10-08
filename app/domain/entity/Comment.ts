'use strict';
import UserEntity from './User';
import ThreadEntity from './Thread';

export default class CommentEntity {
  constructor(private id: string | null, private message: string, private postTo: ThreadEntity, private postBy: UserEntity, private postedOn: Date) {}

  // getter
  getId(): string | null {
    return this.id;
  }
  getMessage(): string {
    return this.message;
  }
  getPostTo(): ThreadEntity {
    return this.postTo;
  }
  getPostBy(): UserEntity {
    return this.postBy;
  }
  getPostedOn(): Date {
    return this.postedOn;
  }
}

export interface CommentRepository {
  getById(id: string): Promise<CommentEntity>;
  getAllComments(threadId: string): Promise<Array<CommentEntity>>;
  save(comment: CommentEntity): Promise<void>;
}
