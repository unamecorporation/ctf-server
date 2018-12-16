import { RESTDataSource } from 'apollo-datasource-rest';
import IGitUser from '../../types/GitUser';

export default class GitUser extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/users/';
  }

  async getUser(nick: string) {
    const user = await this.get(nick);
    return this.reduce(user);
  }

  reduce(user: any): IGitUser {
    return {
      avatar: user.avatar_url,
      bio: user.bio,
      blog: user.blog,
      url: user.html_url,
      login: user.login,
    };
  }
}
