'use strict';

export default class UserEntity {
  constructor(private id: string | null, private name: string) {}

  getId(): string | null {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
};

export interface UserRepository {
  getById(id: string): Promise<UserEntity>;
}
