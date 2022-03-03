export const requestStub = (fail, failRes) => {
  const stub = new Promise((r, x) => {
    if (fail) {
      return x(failRes || {
        response: {
          status: 500,
          body: { message: 'Server is kill' },
        },
      });
    }

    return r();
  });

  stub.accept = sinon.stub().returns(stub);
  stub.set = sinon.stub().returns(stub);
  stub.auth = sinon.stub().returns(stub);
  stub.send = sinon.stub().returns(stub);
  stub.query = sinon.stub().returns(stub);

  return stub;
};

export default (fail = false, failRes) => {
  const getStub = requestStub(fail, failRes);
  const postStub = requestStub(fail, failRes);
  const putStub = requestStub(fail, failRes);
  const patchStub = requestStub(fail, failRes);
  const delStub = requestStub(fail, failRes);

  return {
    getStub,
    get: sinon.stub().returns(getStub),

    postStub,
    post: sinon.stub().returns(postStub),

    putStub,
    put: sinon.stub().returns(putStub),

    patchStub,
    patch: sinon.stub().returns(patchStub),

    delStub,
    del: sinon.stub().returns(delStub),
  };
};
