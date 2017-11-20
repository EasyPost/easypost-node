import customsItem from '../../src/resources/customsItem';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Customs Item Resource', () => {
  it('exists', () => {
    expect(customsItem).to.not.be.undefined;
    expect(customsItem).to.be.a('function');
  });

  it('converts number `value`s to strings', () => {
    const CustomsItem = customsItem(apiStub());
    const ci = new CustomsItem({ value: 20.7 });

    expect(ci.value).to.equal('20.7');
  });

  it('converts number `value`s to strings on save', () => {
    const CustomsItem = customsItem(apiStub());
    const ci = new CustomsItem({ });
    ci.value = 20.7;

    ci.save();

    expect(ci.value).to.equal('20.7');
  });

  it('throws on all', () => {
    const CustomsItem = customsItem(apiStub());
    return CustomsItem.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const CustomsItem = customsItem(apiStub());
    return CustomsItem.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const CustomsItem = customsItem(apiStub());
    const instance = new CustomsItem({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
