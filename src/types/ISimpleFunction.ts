import MessageError from "./MessageError";

export default interface ISimpleFunction {
  expect: boolean;
  message: MessageError;
  error(): boolean;
}
