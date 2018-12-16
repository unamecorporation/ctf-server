export default interface IModel<Entity> {
  safe(): any;
  pretty(entity: Entity): Entity;
}
