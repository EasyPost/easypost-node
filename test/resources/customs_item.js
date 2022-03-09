import customsItem from '../../src/resources/customs_item';
import apiStub from '../helpers/api_stub';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Customs Item Resource', () => {
  it('exists', () => {
    expect(customsItem).to.not.be.undefined;
    expect(customsItem).to.be.a('function');
  });

  it('throws on all', () => {
    const CustomsItem = customsItem(apiStub());
    return CustomsItem.all().then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });

  it('throws on delete', () => {
    const CustomsItem = customsItem(apiStub());
    return CustomsItem.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });

  it('throws on instance delete', () => {
    const CustomsItem = customsItem(apiStub());
    const instance = new CustomsItem({ id: 1 });

    return instance.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });
});
