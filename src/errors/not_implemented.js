import Error from './error';

export const NAME = 'NotImplementedError';
export const STATUS = 405;

export const createMessage = (method, endpoint) =>
  `Method ${method} not implemented for api endpoint ${endpoint}`;

export default class NotImplementedError extends Error {
  constructor(method, endpoint) {
    const message = createMessage(method, endpoint);
    super(message);

    this.name = NAME;
    this.status = STATUS;
  }
}
