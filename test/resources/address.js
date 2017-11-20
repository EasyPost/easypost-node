import address from '../../src/resources/address';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Address Resource', () => {
  it('exists', () => {
    expect(address).to.not.be.undefined;
    expect(address).to.be.a('function');
  });

  it('throws on all', () => {
    const Address = address(apiStub());
    return Address.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const Address = address(apiStub());
    return Address.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Address = address(apiStub());
    const instance = new Address({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('wraps json in its name', () => {
    const Address = address(apiStub());
    const data = {
      street1: '1 1st st',
    };

    const expectedJSON = {
      address: { street1: data.street1 },
    };

    expect(Address.wrapJSON(data)).to.deep.equal(expectedJSON);
  });

  it('wraps json, separating verify and address', () => {
    const Address = address(apiStub());
    const data = {
      street1: '1 1st st',
      verify: ['zip4'],
      verify_strict: ['deliverable'],
    };

    const expectedJSON = {
      address: { street1: data.street1 },
      verify: data.verify,
      verify_strict: data.verify_strict,
    };

    expect(Address.wrapJSON(data)).to.deep.equal(expectedJSON);
  });
});
