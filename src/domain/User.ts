import Player from "./Player";

export default abstract class User {
  public name: string;
  public email: string;
  public password: string;
  public nickname: string;

  constructor(user: Player | any) {
    this.name = user.name || "";
    this.email = user.email || "";
    this.password = user.password || "";
    this.nickname = user.nickname || "";
  }
}
