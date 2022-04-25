import FakeError from './error';

export const createMessage = (status, url) =>
  `Status ${status} returned from API request to ${url}`;

export const NAME = 'RequestError';

export default class RequestError extends FakeError {
  constructor(response, url) {
    // Make sure a response and url were actually passed in
    if (!response) {
      throw new Error('No response passed to RequestError');
    }

    if (typeof url !== 'string') {
      throw new Error('No url passed to RequestError');
    }

    const message = createMessage(
      response.status || response.statusCode || response.code || response.body.code,
      url,
    );

    super(message);
    this.error = response;

    this.name = NAME;
    this.status = response.status || response.code;

    if (response.body) {
      this.detail = response.body.message || response.body.error.message;
      this.errors = response.body.errors || response.body.error.errors;
    }
  }
}
