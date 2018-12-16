import { Response } from 'express';

export default {
  ok: (response: Response, ...msg: any) => {
    return response.status(200).send(...msg);
  },
  notFound: (response: Response, ...msg: any) => {
    return response.status(404).send(...msg);
  },
  badRequest: (response: Response, ...msg: any) => {
    return response.status(400).send(...msg);
  },
  unAuthorized: (response: Response, ...msg: any) => {
    return response.status(401).send(...msg);
  },
  forbidden: (response: Response, ...msg: any) => {
    return response.status(403).send(...msg);
  },
  error: (response: Response, ...msg: any) => {
    return response.status(500).send(...msg);
  },
  unAvailable: (response: Response, ...msg: any) => {
    return response.status(503).send(...msg);
  },
  storageInsufficient: (response: Response, ...msg: any) => {
    return response.status(507).send(...msg);
  },
};
