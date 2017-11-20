import parcel from '../../src/resources/parcel';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Parcel Resource', () => {
  it('exists', () => {
    expect(parcel).to.not.be.undefined;
    expect(parcel).to.be.a('function');
  });

  describe('toJSON', () => {
    let Parcel;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Parcel = parcel(stub);
    });

    it('wrapJSON returns the json', () => {
      const json = { foo: 'bar' };
      expect(Parcel.wrapJSON(json)).to.deep.equal({ parcel: json });
    });
  });


  it('throws on all', () => {
    const Parcel = parcel(apiStub());
    return Parcel.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const Parcel = parcel(apiStub());
    return Parcel.delete().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Parcel = parcel(apiStub());
    const instance = new Parcel({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
