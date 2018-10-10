'use strict';

import UserEntity, {UserRepository as IUserRepository} from '../../domain/entity/User';

export default class UserRepository implements IUserRepository {
  private data: Array<UserEntity>;

  constructor() {
    this.data = [];
  }
  async getById(id: string): Promise<UserEntity> {
    const user = this.data.find(user => user.getId() === id);
    if (user == null) {
      throw new Error('User Not Found');
    }
    return user;
  }
  async save(user: UserEntity): Promise<UserEntity> {
    if (user.getId()) {
      const index = this.data.findIndex(user2 => user.getId() === user2.getId());
      if (index !== -1) {
        this.data.splice(index, 1, user);
      }
      else {
        this.data.push(user);
      }
      return user;
    }

    const id = Math.floor(Math.random() * (2 ** 32)).toString(16);
    const newUser = new UserEntity(id, user.getName());
    this.data.push(newUser);
    return newUser;
  }
}
