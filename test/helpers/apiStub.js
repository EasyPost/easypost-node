import RequestError from '../../src/errors/request';

function buildGetStub(baseUrl, fail, data) {
  const stub = sinon.stub();

  if (fail) {
    const err = new RequestError({ status: 500 }, baseUrl);
    stub.throws(err);
    return stub;
  }

  stub.returns(Promise.resolve({ body: data }));
  return stub;
}

function buildPostStub(baseUrl, fail, data) {
  const stub = sinon.stub();

  if (fail) {
    const err = new RequestError({ status: 500 }, baseUrl);
    stub.throws(err);
    return stub;
  }

  stub.returns(Promise.resolve({ body: data }));
  return stub;
}

export default (baseUrl = '', fail = false, data = {}) => ({
  get: buildGetStub(baseUrl, fail, data),
  put: buildPostStub(baseUrl, fail, data),
  patch: buildPostStub(baseUrl, fail, data),
  post: buildPostStub(baseUrl, fail, data),
  del: buildPostStub(baseUrl, fail, data),
});
