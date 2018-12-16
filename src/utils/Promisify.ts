export default (func: Function) => (...args: any) => {
  return new Promise((resolve, reject) => {
    func(...args, (err: any, result: any) => (err ? reject(err) : resolve(result)));
  });
};
