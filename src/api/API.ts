import { Request, Router, Response } from 'express';
import Service from '../services/Service';
import Http from '../utils/Http';

export default class API {
  protected entryPoints: Function[] = [];
  protected methods: any;
  protected router: Router = Router();

  constructor(service?: Service<any, any>) {
    if (service) {
      this.addPost(service);
      this.delete(service);
      this.update(service);
    }
  }

  private update(service: Service<any, any>) {
    this.addEntryPoint(
      '/:id',
      async (req: Request, res: Response) => {
        try {
          const entity = req.body;
          await service.update(req.params.id, entity);
          return Http.ok(res, entity);
        } catch (error) {
          return Http.error(res, error);
        }
      },
      'post'
    );
  }

  private delete(service: Service<any, any>) {
    this.addEntryPoint(
      '/:id',
      async (req: Request, res: Response) => {
        try {
          await service.delete(req.params.id);
          return Http.ok(res, 'OK');
        } catch (error) {
          console.log('THIS ERROR', error);
          return Http.error(res, error);
        }
      },
      'delete'
    );
  }

  private addPost(service: Service<any, any>) {
    this.addEntryPoint(
      '/',
      async (req: Request, res: Response) => {
        const format = service.formatFromReq(req);
        const validate = await service.validate(format);
        if (validate.error) {
          return Http.error(res, validate.messages);
        }
        const saved = await service.save(service.format(format));
        return Http.ok(res, saved);
      },
      'post'
    );
  }

  addEntryPoint(entryPoint: string, fn: Function, method: string) {
    // @ts-ignore
    this.router[method](entryPoint, (request: Request, response: Response) => fn(request, response));
    return this;
  }

  build() {
    return this.router;
  }
}
