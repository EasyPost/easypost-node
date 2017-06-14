import customsInfo from '../../src/resources/customsInfo';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Customs Info Resource', () => {
  it('exists', () => {
    expect(customsInfo).to.not.be.undefined;
    expect(customsInfo).to.be.a('function');
  });

  it('throws on all', () => {
    const CustomsInfo = customsInfo(apiStub());
    return CustomsInfo.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const CustomsInfo = customsInfo(apiStub());
    return CustomsInfo.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
