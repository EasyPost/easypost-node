import Error from '../../src/errors/error';

describe('Error', () => {
  it('captures the stack trace', () => {
    expect((new Error()).stack).to.be.a('string');
  });

  it('captures a message', () => {
    const message = 'hi';
    expect((new Error(message)).message).to.equal(message);
  });
});
