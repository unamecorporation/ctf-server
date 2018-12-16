export default interface IRepository<Entity, Key> {
  getOne(id: Key): Promise<Entity>;
  getAll(): Promise<Entity[]>;
  save(entity: Entity): Promise<Entity>;
  update(id: Key, update: Entity): Promise<Entity>;
  delete(id: Key): Promise<Entity>;
}
