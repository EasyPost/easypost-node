export default class EasyPostError extends Error {
  constructor({ message } = {}) {
    super(message);
  }
}
