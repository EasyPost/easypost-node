import T from 'proptypes';
import sinon from 'sinon';

import base from '../../src/resources/base';
import apiStub from '../helpers/apiStub';
import RequestError from '../../src/errors/request';
import NotImplementedError from '../../src/errors/notImplemented';
import ValidationError from '../../src/errors/validation';

describe('Base Resource', () => {
  it('exists', () => {
    expect(base).to.not.be.undefined;
    expect(base).to.be.a('function');
  });

  describe('constructor', () => {
    const url = 'base';
    const stub = apiStub(url);
    const Base = base(stub);
    Base.url = url;
    base._name = url;

    expect(new Base()).to.not.throw;
    expect(new Base({})).to.not.throw;
    expect(new Base({ a: 'a' }).a).to.equal('a');
  });

  describe('api', () => {
    let Base;
    let stub;
    const url = 'base';

    describe('success', () => {
      it('can retrieve from the API via url', (done) => {
        stub = apiStub(url, false, { [url]: { } });
        Base = base(stub);
        Base.url = url;

        Base.retrieve('id').then((b) => {
          expect(stub.get).to.have.been.calledOnce;
          expect(stub.get).to.have.been.calledWith(`${Base.url}/id`);
          expect(b).to.be.an.instanceOf(Base);
          done();
        }, (err) => { throw new Error(err); });
      });

      it('can call all from the API via url', (done) => {
        stub = apiStub(url, false, { base: [{ }] });
        Base = base(stub);
        Base.url = url;

        Base.all().then((bs) => {
          expect(stub.get).to.have.been.calledOnce;
          expect(stub.get).to.have.been.calledWith(Base.url, { query: {} });
          bs.map(b => expect(b).to.be.an.instanceOf(Base));
          done();
        }, (err) => { throw new Error(err); });
      });

      it('can delete from the API with an id', (done) => {
        stub = apiStub(url);
        Base = base(stub);
        Base.url = url;

        const id = 'id';

        Base.delete(id).then(() => {
          expect(stub.del).to.have.been.calledOnce;
          expect(stub.del).to.have.been.calledWith(`${Base.url}/${id}`);
          done();
        }, (err) => { throw new Error(err); });
      });

      it('throws if delete is called without an id', (done) => {
        Base.delete().catch((e) => {
          expect(e.message).to.match(/no id was passed in/i);
          done();
        }, (err) => { throw new Error(err); });
      });
    });

    describe('failures', () => {
      beforeEach(() => {
        stub = apiStub(url, true);
        Base = base(stub);
        Base.url = url;
      });

      it('can handle failures on retrieve', (done) => {
        Base.retrieve('id').then(() => {}, (err) => {
          expect(err).to.be.an.instanceOf(RequestError);
          done();
        });
      });

      it('can handle failures on all', (done) => {
        Base.all().then(() => {}, (err) => {
          expect(err).to.be.an.instanceOf(RequestError);
          done();
        });
      });

      it('can handle failures on del', (done) => {
        Base.delete('id').then(() => {}, (err) => {
          expect(err).to.be.an.instanceOf(RequestError);
          done();
        });
      });
    });
  });

  it('can provide a notimplemented helper', (done) => {
    const stub = apiStub();
    const Base = base(stub);
    Base.notImplemented('test').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
      done();
    });
  });

  describe('json', () => {
    let stub;
    let Base;
    const name = 'base';
    const baseKey = 'base_key';
    const json = { a: 'a' };
    const wrappedJson = { [baseKey]: json };

    beforeEach(() => {
      stub = apiStub();
      Base = base(stub);
      Base.propTypes = { a: T.string };
      Base._name = name;
      Base.url = name;
      Base.key = baseKey;
    });

    it('can wrap json with its name', () => {
      expect(Base.wrapJSON(json)).to.deep.equal(wrappedJson);
    });

    it('can unwrap array api responses', () => {
      expect(Base.unwrapAll([json])).to.deep.equal([json]);
    });

    it('can jsonify itself', () => {
      const bi = new Base(json);
      expect(bi.toJSON()).to.deep.equal(json);
    });
  });

  describe('validation', () => {
    let stub;
    let Base;
    const propTypes = { a: T.string };
    const name = 'base';
    const data = { a: 'a' };

    beforeEach(() => {
      stub = apiStub();
      Base = base(stub);
      Base.propTypes = propTypes;
      Base._name = name;
    });

    it('sets _validationerrors to null on successful validation', () => {
      const b = new Base(data);

      Base.proptypes = null;
      b.validateProperties(false);

      expect(b._validationErrors).to.be.null;
    });

    it('sets _validationerrors to the errors on failed validation and throw = false', () => {
      const b = new Base({ a: 1 });

      Base.proptypes = null;
      b.validateProperties(false);

      expect(b._validationErrors).to.be.a('object');
      expect(b._validationErrors.a).to.be.a('string');
    });

    it('throws a validationerror on failed validation and throw = false', () => {
      const b = new Base({ a: 1 });
      Base.proptypes = null;

      expect(() => b.validateProperties()).to.throw(ValidationError);
    });

    it('can validate properties on a function call', () => {
      const b = new Base({ a: 1 });

      b.verifyParameters();
      b.verifyParameters({ this: ['a'] });
      b.verifyParameters({ args: ['a'] }, 'a');
      b.verifyParameters({ this: ['a'], args: ['a'] }, 'a');

      expect(() => b.verifyParameters({ this: ['a'], args: ['a'] })).to.throw(/\wa\w/);
      expect(() => b.verifyParameters({ this: ['b'] })).to.throw(/\wb\w/);
    });
  });

  describe('save()', () => {
    let stub;
    let Base;
    const propTypes = { a: T.string, id: T.string };
    const name = 'base';
    const data = { a: 'a' };

    beforeEach(() => {
      stub = apiStub();
      Base = base(stub);
      Base.propTypes = propTypes;
      Base._name = name;
      Base.url = name;
    });

    it('calls api post when valid', (done) => {
      const bi = new Base(data);
      bi.save().then(() => {
        expect(stub.post).to.have.been.calledWith(Base.url, { body: Base.wrapJSON(bi.toJSON()) });
        done();
      }, (err) => { throw new Error(err); });
    });

    it('calls api put when it has an id', (done) => {
      const bi = new Base(data);
      bi.id = 'id';

      bi.save().then(() => {
        expect(stub.put).to.have.been.calledWith(Base.url, { body: Base.wrapJSON(bi.toJSON()) });
        done();
      }, (err) => { throw new Error(err); });
    });

    it('rejects on api failure', (done) => {
      Base = base(apiStub(Base.url, true));
      Base.propTypes = propTypes;
      Base._name = name;
      Base.url = name;

      new Base(data).save().then(() => {}, (err) => {
        expect(err).to.be.a.instanceOf(RequestError);
        done();
      });
    });

    it('rejects when invalid data is passed in', (done) => {
      new Base({ a: 1 }).save().then(() => {}, (err) => {
        expect(err).to.be.a.instanceOf(ValidationError);
        done();
      });
    });
  });

  describe('retrieve()', () => {
    let stub;
    let Base;
    const propTypes = { a: T.string, id: T.string };
    const name = 'base';
    const data = { a: 'a', id: 'id' };
    const stubRes = { toJSON: () => ({ a: 'b', id: data.id }) };

    beforeEach(() => {
      stub = apiStub();
      Base = base(stub);
      Base.propTypes = propTypes;
      Base._name = name;
      Base.url = name;
    });

    it('calls retrieve with the instance id', (done) => {
      const bi = new Base(data);
      const retrieveStub = sinon.stub(Base, 'retrieve').returns(stubRes);

      bi.retrieve().then(() => {
        expect(retrieveStub).to.have.been.calledWith(bi.id);
        done();
      }, (err) => { throw new Error(err); });
    });

    it('throws if there is no shipment id', (done) => {
      delete data.id;

      const bi = new Base(data);

      bi.retrieve().catch((e) => {
        expect(e.message).to.match(/without an id/);
        done();
      });
    });
  });

  describe('rpc', () => {
    let stub;
    let Base;
    const propTypes = { a: T.string };
    const name = 'base';
    const data = { a: 'a', id: '1' };

    beforeEach(() => {
      stub = apiStub();
      Base = base(stub);
      Base.propTypes = propTypes;
      Base._name = name;
      Base.url = name;
    });

    it('calls api post with path and body', (done) => {
      const bi = new Base(data);
      const path = 'path';
      const body = { a: 'a' };

      const url = `${Base.url}/${bi.id}/${path}`;

      bi.rpc(path, body).then(() => {
        expect(stub.post).to.have.been.calledWith(url, { body });
        done();
      }, (err) => { throw new Error(err); });
    });

    it('maps response props to itself', (done) => {
      const resData = { b: 'b' };
      Base = base(apiStub(Base.url, false, resData));
      Base._name = 'base';

      const bi = new Base(data);
      const path = 'path';
      const body = { a: 'a' };

      bi.rpc(path, body).then(() => {
        expect(bi.b).to.equal(resData.b);
        done();
      }, (err) => { throw new Error(err); });
    });

    it('rejects on api failure', (done) => {
      Base = base(apiStub(Base.url, true));
      Base.propTypes = propTypes;
      Base._name = name;
      Base.url = name;

      new Base(data).rpc().then(() => {}, (err) => {
        expect(err).to.be.a.instanceOf(RequestError);
        done();
      });
    });
  });
});
