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
    Base._url = url;
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
      it('can retrieve from the API via url', () => {
        stub = apiStub(url, false, { [url]: { } });
        Base = base(stub);
        Base._url = url;

        return Base.retrieve('id').then((b) => {
          expect(stub.get).to.have.been.calledOnce;
          expect(stub.get).to.have.been.calledWith(`${Base._url}/id`);
          expect(b).to.be.an.instanceOf(Base);
        }, (err) => { throw new Error(err); });
      });

      it('can call all from the API via url', () => {
        stub = apiStub(url, false, { base: [{ }] });
        Base = base(stub);
        Base._url = url;

        return Base.all().then((bs) => {
          expect(stub.get).to.have.been.calledOnce;
          expect(stub.get).to.have.been.calledWith(Base._url, { query: {} });
          bs.map(b => expect(b).to.be.an.instanceOf(Base));
        }, (err) => { throw new Error(err); });
      });

      it('can delete from the API with an id', () => {
        stub = apiStub(url);
        Base = base(stub);
        Base._url = url;

        const id = 'id';

        return Base.delete(id).then(() => {
          expect(stub.del).to.have.been.calledOnce;
          expect(stub.del).to.have.been.calledWith(`${Base._url}/${id}`);
        }, (err) => { throw new Error(err); });
      });

      it('throws if delete is called without an id', () => {
        Base.delete().catch((e) => {
          expect(e.message).to.match(/no id was passed in/i);
        }, (err) => { throw new Error(err); });
      });
    });

    describe('failures', () => {
      beforeEach(() => {
        stub = apiStub(url, true);
        Base = base(stub);
        Base._url = url;
      });

      it('can handle failures on retrieve', () => {
        return Base.retrieve('id').then(() => {}, (err) => {
          expect(err).to.be.an.instanceOf(RequestError);
        });
      });

      it('can handle failures on all', () => {
        return Base.all().then(() => {}, (err) => {
          expect(err).to.be.an.instanceOf(RequestError);
        });
      });

      it('can handle failures on del', () => {
        return Base.delete('id').then(() => {}, (err) => {
          expect(err).to.be.an.instanceOf(RequestError);
        });
      });
    });
  });

  it('can provide a notimplemented helper', () => {
    const stub = apiStub();
    const Base = base(stub);
    return Base.notImplemented('test').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('json', () => {
    let stub;
    let Base;
    const name = 'base';
    const baseKey = 'base_key';
    const json = { a: 'a' };
    const propTypes = { a: T.string, b: T.string, child: T.object };
    const wrappedJson = { [baseKey]: json };

    beforeEach(() => {
      stub = apiStub();
      Base = base(stub);
      Base.propTypes = propTypes;
      Base._name = name;
      Base._url = name;
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

    it('can jsonify itself and child objects', () => {
      const childProperties = { b: 'b' };

      const properties = {
        a: 'a',
        child: new Base(childProperties),
      };

      const expectedJSON = { a: 'a', child: { b: 'b' } };

      const bi = new Base(properties);
      expect(bi.toJSON()).to.deep.equal(expectedJSON);
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

    it('throws a validationerror on failed validation', () => {
      const b = new Base({ a: 1 });
      Base.proptypes = null;
      expect(() => b.validateProperties()).to.throw(/Failed validating base/);
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
      Base._url = name;
    });

    it('calls api post when valid', () => {
      const bi = new Base(data);
      return bi.save().then(() => {
        expect(stub.post).to.have.been.calledWith(Base._url, { body: Base.wrapJSON(bi.toJSON()) });
      }, (err) => { throw new Error(err); });
    });

    it('calls api put when it has an id', () => {
      const bi = new Base(data);
      bi.id = 'id';

      return bi.save().then(() => {
        expect(stub.put).to.have.been.calledWith(`${Base._url}/${bi.id}`, { body: Base.wrapJSON(bi.toJSON()) });
      }, (err) => { throw new Error(err); });
    });

    it('rejects on api failure', () => {
      Base = base(apiStub(Base._url, true));
      Base.propTypes = propTypes;
      Base._name = name;
      Base._url = name;

      return new Base(data).save().then(() => {}, (err) => {
        expect(err).to.be.a.instanceOf(RequestError);
      });
    });

    it('rejects when invalid data is passed in', () => {
      return new Base({ a: 1 }).save().then(() => {}, (err) => {
        expect(err).to.be.a.instanceOf(ValidationError);
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
      Base._url = name;
    });

    it('calls retrieve with the instance id', () => {
      const bi = new Base(data);
      const retrieveStub = sinon.stub(Base, 'retrieve').returns(stubRes);

      return bi.retrieve().then(() => {
        expect(retrieveStub).to.have.been.calledWith(bi.id);
      }, (err) => { throw new Error(err); });
    });

    it('throws if there is no instance id', () => {
      delete data.id;

      const bi = new Base(data);

      bi.retrieve().catch((e) => {
        expect(e.message).to.match(/without an id/);
      });
    });
  });

  describe('delete()', () => {
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
      Base._url = name;
    });

    it('calls delete with the instance id', () => {
      const bi = new Base(data);
      const deleteStub = sinon.stub(Base, 'delete').returns(stubRes);

      return bi.delete().then(() => {
        expect(deleteStub).to.have.been.calledWith(bi.id);
      }, (err) => { throw new Error(err); });
    });

    it('throws if there is no instance id', () => {
      delete data.id;

      const bi = new Base(data);

      bi.delete().catch((e) => {
        expect(e.message).to.match(/without an id/);
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
      Base._url = name;
    });

    it('calls api post with path and body', () => {
      const bi = new Base(data);
      const path = 'path';
      const body = { a: 'a' };

      const url = `${Base._url}/${bi.id}/${path}`;

      return bi.rpc(path, body).then(() => {
        expect(stub.post).to.have.been.calledWith(url, { body });
      }, (err) => { throw new Error(err); });
    });

    it('maps response props to itself', () => {
      const resData = { b: 'b' };
      Base = base(apiStub(Base._url, false, resData));
      Base._name = 'base';

      const bi = new Base(data);
      const path = 'path';
      const body = { a: 'a' };

      return bi.rpc(path, body).then(() => {
        expect(bi.b).to.equal(resData.b);
      }, (err) => { throw new Error(err); });
    });

    it('rejects on api failure', () => {
      Base = base(apiStub(Base._url, true));
      Base.propTypes = propTypes;
      Base._name = name;
      Base._url = name;

      return new Base(data).rpc().then(() => {}, (err) => {
        expect(err).to.be.a.instanceOf(RequestError);
      });
    });
  });
});
