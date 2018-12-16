import IModel from "../types/IModel";
import { uuid } from "../utils/Strings";
import User from "./User";

interface IPlayerProps {
  idPlayer?: string;
  [key: string]: string;
}

export default class Player extends User implements IModel<Player> {
  public idPlayer?: string;
  public github: string;

  constructor(player?: IPlayerProps) {
    super({ ...player });
    this.github = player.github || "";
    this.idPlayer = player.idPlayer || "";
  }

  public safe() {
    return {
      email: this.email,
      idPlayer: this.idPlayer,
      name: this.name,
      nickname: this.nickname,
    };
  }

  public pretty(player: Player) {
    return new Player({
      email: player.email,
      idPlayer: uuid(),
      name: player.name,
      nickname: player.nickname,
      password: player.password,
    });
  }
}
