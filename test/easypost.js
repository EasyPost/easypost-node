import superagent from 'superagent';
import superagentStub from './helpers/superagentStub';

import RequestError from '../src/errors/request';

import {
  default as API,
  DEFAULT_HEADERS,
  DEFAULT_TIMEOUT,
  DEFAULT_BASE_URL,
  METHODS,
  RESOURCES,
} from '../src/easypost';

describe('Base API object', () => {
  const key = 'abc';

  it('exposes http methods which map to superagent', () => {
    expect(METHODS.GET).to.not.be.undefined;
    expect(METHODS.POST).to.not.be.undefined;
    expect(METHODS.PUT).to.not.be.undefined;
    expect(METHODS.PATCH).to.not.be.undefined;
    expect(METHODS.DELETE).to.not.be.undefined;

    Object.keys(METHODS).map(k => expect(superagent[METHODS[k]]).to.be.a('function'));
  });

  it('exists', () => {
    expect(API).to.not.be.undefined;
  });

  describe('headers', () => {
    it('builds default headers', () => {
      expect(API.buildHeaders()).to.deep.equal(DEFAULT_HEADERS);
    });

    it('merges extra headers', () => {
      const merge = { 'x-fake': 'true', 'content-type': 'application/json' };
      const mergedHeaders = { ...DEFAULT_HEADERS, ...merge };

      expect(API.buildHeaders(merge)).to.deep.equal(mergedHeaders);
    });

    it('removes headers when in a browser', () => {
      global.window = true;
      const filteredHeaders = { ...DEFAULT_HEADERS };
      delete filteredHeaders['User-Agent'];
      delete filteredHeaders['Accept-Encoding'];

      expect(API.buildHeaders()).to.deep.equal(filteredHeaders);
      global.window = undefined;
    });
  });

  describe('constructor', () => {
    it('throws if no key is given', () => {
      expect(() => new API()).to.throw(Error);
    });

    it('sets up with key and default options', () => {
      const api = new API(key);

      expect(api.baseUrl).to.equal(DEFAULT_BASE_URL);
      expect(api.timeout).to.equal(DEFAULT_TIMEOUT);
    });

    it('sets the api key and options', () => {
      const options = {
        timeout: 120,
        baseUrl: 'https://fakeeasypost.com',
      };

      const api = new API(key, options);

      expect(api.key).to.equal(key);
      expect(api.timeout).to.equal(options.timeout);
      expect(api.baseUrl).to.equal(options.baseUrl);
    });

    it('sets up bound resources', () => {
      const api = new API(key);
      Object.keys(RESOURCES).forEach((r) => {
        expect(api[r]).to.be.a('function');
      });
    });

    it('uses default url if no path is provided', () => {
      const api = new API(key);
      expect(api.buildPath()).to.equal(DEFAULT_BASE_URL);
    });

    it('builds paths based on default url', () => {
      const path = 'addresses';
      const api = new API(key);
      expect(api.buildPath('addresses')).to.equal(DEFAULT_BASE_URL + path);
    });

    it('uses a full path if provided', () => {
      const path = 'https://someothersubdomain.easypost.com';
      const api = new API(key);
      expect(api.buildPath(path)).to.equal(path);
    });

    it('uses superagentMiddleware if provided', () => {
      const api = new API(key, {
        superagentMiddleware: s => 'test',
      });

      expect(api.agent).to.equal('test');
    });
  });

  describe('request', () => {
    let api;
    const superagentMiddleware = () => superagentStub();

    beforeEach(() => {
      api = new API(key, { superagentMiddleware });
    });

    it('makes a GET baseurl request by default', (done) => {
      api.request().then(() => {
        expect(api.agent.get).to.have.been.called;
        expect(api.agent.get).to.have.been.calledWith(DEFAULT_BASE_URL);
        done();
      });
    });

    it('requets json', (done) => {
      api.request('').then(() => {
        expect(api.agent.getStub.accept).to.have.been.calledWith('json');
        done();
      });
    });

    it('sets default headers', (done) => {
      api.request('').then(() => {
        expect(api.agent.getStub.set).to.have.been.calledWith(DEFAULT_HEADERS);
        done();
      });
    });

    it('sets auth', (done) => {
      api.request('').then(() => {
        expect(api.agent.getStub.auth).to.have.been.calledWith(key);
        done();
      });
    });

    it('uses requestMiddleware', (done) => {
      const requestMiddleware = sinon.stub().returnsArg(0);
      api = new API(key, { requestMiddleware, superagentMiddleware });
      api.agent = superagentStub();
      api.request('').then(() => {
        expect(requestMiddleware).to.have.been.called;
        done();
      });
    });

    it('sets query if given', (done) => {
      const query = { a: 'a' };

      api.request('', METHODS.GET, { query }).then(() => {
        expect(api.agent.getStub.query).to.have.been.calledWith(query);
        done();
      });
    });

    it('sets body if given', (done) => {
      const body = { a: 'a' };

      api.request('', METHODS.POST, { body }).then(() => {
        expect(api.agent.postStub.send).to.have.been.calledWith(body);
        done();
      });
    });

    it('handles request failures with a RequestError', (done) => {
      api.agent = superagentStub(true);

      api.request('', METHODS.POST).then(() => {}, (err) => {
        expect(err).to.be.an.instanceOf(RequestError);
        done();
      });
    });

    it('handles severe request failures with an Error', (done) => {
      const error = new Error();
      api.agent = superagentStub(true, error);

      api.request('', METHODS.POST).then(() => {}, (err) => {
        expect(err).to.equal(error);
        done();
      });
    });
  });

  describe('request methods', () => {
    const path = 'addresses';
    let api;

    beforeEach(() => {
      api = new API(key);
      api.request = sinon.stub();
    });

    it('proxies `get` to request with METHODS.GET', () => {
      api.get(path);
      expect(api.request.args[0]).to.include(METHODS.GET);
    });

    it('proxies `post` to request with METHODS.POST', () => {
      api.post(path);
      expect(api.request.args[0]).to.include(METHODS.POST);
    });

    it('proxies `put` to request with METHODS.PUT', () => {
      api.put(path);
      expect(api.request.args[0]).to.include(METHODS.PUT);
    });

    it('proxies `patch` to request with METHODS.PATCH', () => {
      api.patch(path);
      expect(api.request.args[0]).to.include(METHODS.PATCH);
    });

    it('proxies `del` to request with METHODS.DEL', () => {
      api.del(path);
      expect(api.request.args[0]).to.include(METHODS.DELETE);
    });
  });
});
