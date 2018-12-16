import { Response, Request } from 'express';

export default interface IAPI<Entity, Key> {
  save(request: Request, response: Response): Promise<Response>;
  update(id: Key, entity: Entity): Promise<Entity>;
  delete(entity: Key): Promise<Entity>;
}
