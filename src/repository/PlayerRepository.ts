import Tables from "../config/Tables";
import Player from "../domain/Player";
import Repository from "./Repository";

export default class PlayerRepository extends Repository<Player, string> {
  constructor() {
    super(Tables.player, "idPlayer");
  }

  public async existByEmail(email: string): Promise<any> {
    const rows = await this.emailList(email);
    return rows[0].emails !== 0;
  }

  public async oneEmail(email: string): Promise<any> {
    const rows = await this.emailList(email);
    return rows[0].emails === 1;
  }

  public async getCredentials(email: string, encripted: string) {
    const user = await this.db.where("email", email).where("password", encripted);
    return user[0];
  }

  public async findByNick(nick: string): Promise<any> {
    const some = await this.db.where("nickname", nick);
    return [...some];
  }

  private async emailList(email: string): Promise<any> {
    return this.db.where("email", email).count("email as emails");
  }
}
