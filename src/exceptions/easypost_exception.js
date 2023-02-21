export default class EasyPostException extends Error {
  constructor({ message } = {}) {
    super(message);
  }
}
