import ISimpleFunction from "../types/ISimpleFunction";
import MessageError from "../types/MessageError";

const simpleValidator = (messages: Array<MessageError>, ...fns: Array<ISimpleFunction>) => {
  fns.forEach((x: ISimpleFunction) => (x.error() === x.expect ? "" : messages.push(x.message)));
  return messages;
};

export default simpleValidator;
