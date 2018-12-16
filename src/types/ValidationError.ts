import MessageError from 'MessageError';

export default interface ValidationError<Entity> {
  error: Boolean;
  messages: MessageError[];
  entity: Entity;
}
