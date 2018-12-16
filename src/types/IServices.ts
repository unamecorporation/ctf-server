import ValidationError from '../types/ValidationError';
import { Request } from 'express';
export default interface IServices<Entity> {
  validate(entity: Entity): Promise<ValidationError<Entity>>;
  format(entity: Entity): Entity;
  formatFromReq(req: Request): Entity;
}
