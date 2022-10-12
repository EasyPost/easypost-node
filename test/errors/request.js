import RequestError, { createMessage, NAME } from '../../src/errors/request';

describe('Request Errors', () => {
  const error = {
    status: 422,
  };

  const sysError = {
    code: 'ECONNDISCONNECTED',
  };

  const url = '/addresses';

  it('generates a helpful error message', () => {
    expect(new RequestError(error, url).message).to.equal(createMessage(error.status, url));
    expect(new RequestError(error, url).message).to.exist;
  });

  it('maps code to status on sys errors', () => {
    const requestError = new RequestError(sysError, url);
    expect(requestError.status).to.equal(sysError.code);
    expect(requestError.error.code).to.equal(sysError.code);
  });

  it('has a name', () => {
    expect(new RequestError(error, url).name).to.equal(NAME);
  });

  it('sets the status based on the error', () => {
    expect(new RequestError(error, url).status).to.equal(error.status);
  });

  it('throws if no response is passed in', () => {
    expect(() => new RequestError()).to.throw(/no response/i);
  });

  it('throws if no url is passed in', () => {
    expect(() => new RequestError(new Error())).to.throw(/no url/i);
  });

  it('adds additional data if it is passed a response object', () => {
    const res = {
      body: {
        error: {
          message: 'test',
          errors: ['test is fail'],
        },
      },
      status: 422,
    };

    expect(new RequestError(res, url).detail).to.equal(res.body.error.message);
    expect(new RequestError(res, url).errors).to.equal(res.body.error.errors);
  });
});
