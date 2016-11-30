import FakeError from './error';

export const createMessage = (status, url) => (
  `Status ${status} returned from API request to ${url}`
);

export const NAME = 'RequestError';

export default class RequestError extends FakeError {
  /* eslint consistent-return: 0 */
  constructor(error, url) {
    // Make sure an error and url were actually passed in
    if (!error) { throw new Error('No error passed to RequestError'); }

    if (typeof url !== 'string') {
      throw new Error('No url passed to RequestError');
    }

    const message = createMessage(error.status || error.code, url);

    super(message);
    this.error = error;

    this.name = NAME;
    this.status = error.status || error.code;

    if (error.body) {
      this.detail = error.body.error.message;
      this.errors = error.body.error.errors;
    }
  }
}
