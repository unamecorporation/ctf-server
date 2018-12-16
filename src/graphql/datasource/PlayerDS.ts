import { RESTDataSource } from 'apollo-datasource-rest';
import PlayerRepository from '../../repository/PlayerRepository';

export default class PlayerDS extends RESTDataSource {
  private readonly repository: PlayerRepository;

  constructor() {
    super();
    this.repository = new PlayerRepository();
  }

  async getPlayer(id: string) {
    return await this.repository.getOne(id);
  }

  async playerByNick(id: string) {
    return await this.repository.findByNick(id);
  }

  async allPlayers() {
    return await this.repository.getAll();
  }
}
