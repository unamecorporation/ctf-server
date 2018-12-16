import { idName } from './../utils/Strings';
import { v4 as uuid } from 'uuid';
import IRepository from '../types/IRepository';
import Database from '../database';
import { QueryBuilder } from 'knex';

export default abstract class Repository<Entity, Key> implements IRepository<Entity, Key> {
  public readonly table: string;
  public readonly db: QueryBuilder;
  public readonly id: string;
  public readonly namedId: string;

  constructor(table: string, id?: string) {
    this.id = id;
    this.db = Database.table(table);
    this.table = table;
    this.namedId = this.id || idName(this.table);
  }

  async getOne(id: Key): Promise<Entity> {
    const value = await this.db.where(this.namedId, `${id}`).limit(1);
    return value[0];
  }

  async getAll(): Promise<Entity[]> {
    return this.db.select();
  }

  async save(entity: Entity): Promise<Entity> {
    try {
      await this.db.insert({ ...entity, [this.namedId]: uuid() });
      return entity;
    } catch (error) {
      console.log('ERRO AO GRAVAR', error);
      return error;
    }
  }

  async update(id: Key, update: Entity): Promise<Entity> {
    try {
      await this.db.where(this.namedId, `${id}`).update(update);
      return update;
    } catch (error) {}
  }

  async delete(id: Key): Promise<Entity> {
    try {
      const deleted = this.db.where('id', `${id}`);
      await { ...deleted }.delete();
      return deleted;
    } catch (e) {
      return e;
    }
  }
}
