import { Request, Response, Router } from "express";
import Player from "../domain/Player";
import PlayerService from "../services/PlayerService";
import WebSocket from "../sockets/WebSocket";
import Http from "../utils/Http";
import API from "./API";

const service = new PlayerService();
const api = new API();

api
  .addEntryPoint(
    "/register",
    async (request: Request, response: Response) => {
      const proceed = await service.validate({ ...request.body });
      if (proceed.error) {
        return Http.badRequest(response, proceed.messages);
      }
      const save = await service.save(proceed.entity);
      WebSocket.emit("news", "Cadastrando novo player");
      return Http.ok(response, { player: save.player, jwt: save.jwt });
    },
    "post",
  )
  .addEntryPoint(
    "/profile",
    async (request: Request, response: Response) => {
      const proceed = await service.validate({ ...request.body }, true);
      if (proceed.error) {
        return Http.badRequest(response, proceed.messages);
      }
      const save = await service.save(proceed.entity);
      WebSocket.emit("news", "Cadastrando novo player");
      return Http.ok(response, { player: save.player, jwt: save.jwt });
    },
    "put",
  )
  .addEntryPoint(
    "/",
    async (request: Request, response: Response) => {
      try {
        return Http.ok(response, { jwt: await service.login(request) });
      } catch (error) {
        return Http.error(response, { error: "Deu ruim" });
      }
    },
    "post",
  );

export default api.build();
