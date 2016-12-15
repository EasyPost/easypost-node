import parcel from '../../src/resources/parcel';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Parcel Resource', () => {
  it('exists', () => {
    expect(parcel).to.not.be.undefined;
    expect(parcel).to.be.a('function');
  });

  it('throws on all', () => {
    const Parcel = parcel(apiStub());
    Parcel.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const Parcel = parcel(apiStub());
    Parcel.delete().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
