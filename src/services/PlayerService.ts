import { Request } from "express";
import { isEmpty } from "ramda";
import { Validations } from "sidekicker";
import Player from "../domain/Player";
import PlayerRepository from "../repository/PlayerRepository";
import SimpleValidator from "../types/SimpleValidator";
import ValidationError from "../types/ValidationError";
import JwtService from "./auth/JwtService";
import Service from "./Service";

export default class PlayerService extends Service<Player, string> {
  constructor() {
    super(new PlayerRepository());
  }

  public format(player: Player): Player {
    return player.pretty(player);
  }

  public formatFromReq(req: Request) {
    return new Player({ ...req.body });
  }

  public async save(player: Player): Promise<any> {
    await this.repository.save(player);
    return {
      jwt: JwtService.generateToken(player.idPlayer, player.email),
      player: this.safePlayer(player),
    };
  }

  public async login(req: Request): Promise<string> {
    const player = this.formatFromReq(req);
    const logged = await this.repository.getCredentials(player.email, player.password);
    return JwtService.generateToken(player.idPlayer, logged.email);
  }

  public async validate(reqPlayer: Player, update: boolean = false): Promise<ValidationError<Player>> {
    const player = new Player({ ...reqPlayer });
    const existEmail = await this.findEmail(player.email, update);
    const messages = SimpleValidator(
      [],
      {
        error: () => existEmail,
        expect: update,
        message: { title: "Repeated Email", body: "This email already Exist" },
      },
      {
        error: () => Validations.Email(player.email),
        expect: true,
        message: { title: "Incorrect Email", body: "Your email doesn't match with official pattern" },
      },
      {
        error: () => isEmpty(player.name),
        expect: false,
        message: { title: "Error on Name", body: "Your name cannot be empty or out of pattern" },
      },
      {
        error: () => isEmpty(player.nickname),
        expect: false,
        message: { title: "Error on Nickname", body: "Use the unix pattern for nickname" },
      },
    );
    return {
      entity: player,
      error: messages.length > 0,
      messages,
    };
  }

  private async findEmail(email: string, update: boolean = false) {
    if (update) {
      return this.repository.oneEmail(email);
    }
    return this.repository.existByEmail(email);
  }

  private safePlayer(player: Player) {
    const { password, ...safe } = player;
    return safe;
  }
}
