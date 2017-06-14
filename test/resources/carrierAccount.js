import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import carrierAccount from '../../src/resources/carrierAccount';

describe('CarrierAccount Resource', () => {
  it('exists', () => {
    expect(carrierAccount).to.not.be.undefined;
    expect(carrierAccount).to.be.a('function');
  });

  it('throws on retrieve', () => {
    const CarrierAccount = carrierAccount(apiStub());
    return CarrierAccount.retrieve().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', () => {
    const CarrierAccount = carrierAccount(apiStub());
    const cti = new CarrierAccount();

    return cti.save().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
