'use strict';
import UserEntity from './User';

export default class ThreadEntity {
  constructor(private id: string | null, private title: string, private owner: UserEntity, private closed: boolean) {}

  // getter
  getId(): string | null {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getOwner(): UserEntity {
    return this.owner;
  }
  getClosed(): boolean {
    return this.closed;
  }

  // behavior
  isCreatedBy(user: UserEntity): boolean {
    return this.owner.getId() === user.getId();
  }
  close(): void {
    this.closed = true;
  }
};

export interface ThreadRepository {
  getById(id: string): Promise<ThreadEntity>;
  getAllThreads(): Promise<Array<ThreadEntity>>;
  save(thread: ThreadEntity): Promise<void>;
}
