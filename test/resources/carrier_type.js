import apiStub from '../helpers/api_stub';
import NotImplementedError from '../../src/errors/not_implemented';
import carrierType from '../../src/resources/carrier_type';


describe('CarrierType Resource', () => {
  it('exists', () => {
    expect(carrierType).to.not.be.undefined;
    expect(carrierType).to.be.a('function');
  });

  it('throws on retrieve', () => {
    const CarrierType = carrierType(apiStub());
    return CarrierType.retrieve().then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const CarrierType = carrierType(apiStub());
    return CarrierType.delete('id').then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const CarrierType = carrierType(apiStub());
    const instance = new CarrierType({ id: 1 });

    return instance.delete('id').then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', () => {
    const CarrierType = carrierType(apiStub());
    const cti = new CarrierType();

    return cti.save().then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
