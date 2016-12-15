import customsItem from '../../src/resources/customsItem';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Customs Item Resource', () => {
  it('exists', () => {
    expect(customsItem).to.not.be.undefined;
    expect(customsItem).to.be.a('function');
  });

  it('throws on all', () => {
    const CustomsItem = customsItem(apiStub());
    CustomsItem.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const CustomsItem = customsItem(apiStub());
    CustomsItem.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
