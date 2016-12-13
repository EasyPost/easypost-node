import {
  default as ValidationError,
  NAME,
  STATUS,
  createMessage,
} from '../../src/errors/validation';

describe('Validation Errors', () => {
  const errors = ['bad thing'];
  const className = 'className';

  it('generates a helpful error message', () => {
    expect((new ValidationError(errors, className)).message).to.equal(createMessage(className));

    expect((new ValidationError(errors, className)).message).to.not.be.undefined;
  });

  it('adds a status 422 to errors', () => {
    expect((new ValidationError(errors, className)).status).to.equal(STATUS);
    expect(STATUS).to.equal(422);
  });

  it('adds a list of errors', () => {
    expect((new ValidationError(errors, className)).errors).to.deep.equal(errors);
  });

  it('has a name', () => {
    expect((new ValidationError(errors, className)).name).to.equal(NAME);
  });
});
