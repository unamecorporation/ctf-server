import { gql } from 'apollo-server';

export default gql`
  type Query {
    gitUser(nick: String): GitUser
    getPlayer(id: String): Player
    playerByNick(nick: String): [Player]
    allPlayers: [Player]
  }

  type Player {
    idPlayer: String
    name: String
    email: String
    nickname: String
    github: String
  }

  type GitUser {
    url: String
    blog: String
    bio: String
    avatar: String
    login: String
  }
`;
