import Error from './error';

export const createMessage = (className) =>
  `Failed validating ${className}. View \`e.errors\` for details.`;

export const NAME = 'ValidationError';
export const STATUS = 422;

export default class ValidationError extends Error {
  constructor(errors, className) {
    const message = createMessage(className);
    super(message);

    this.name = NAME;
    this.errors = errors;
    this.status = STATUS;
  }
}
