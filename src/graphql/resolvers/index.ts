export default {
  Query: {
    async gitUser(obj: any, { nick }: any, context: any) {
      return context.dataSources.git.getUser(nick);
    },
    async getPlayer(obj: any, { id }: any, context: any) {
      return context.dataSources.player.getPlayer(id);
    },
    async playerByNick(obj: any, { nick }: any, context: any) {
      return context.dataSources.player.playerByNick(nick);
    },
    async allPlayers(obj: any, args: any, context: any) {
      return context.dataSources.player.allPlayers();
    },
  },
};
