import IServices from '../types/IServices';
import IAPI from '../types/IAPI';
import IRepository from '../types/IRepository';
import ValidationError from '../types/ValidationError';
import Repository from '../repository/Repository';
import { Request } from 'express';

export default abstract class Service<Entity, Key> implements IServices<Entity> {
  protected repository: any;

  constructor(repository: IRepository<Entity, Key>) {
    this.repository = repository;
  }

  async validate(entity: Entity): Promise<ValidationError<Entity>> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  formatFromReq(req: Request) {
    throw new Error('Method not implemented.');
  }

  format(entity: Entity): Entity {
    return { ...entity };
  }

  async save(entity: Entity): Promise<any> {
    return await this.repository.save(entity);
  }

  async update(id: Key, entity: Entity): Promise<any> {
    return this.repository.update(id, entity);
  }

  async delete(id: Key): Promise<any> {
    return this.repository.delete(id)
  }
}
