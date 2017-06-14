import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import insurance from '../../src/resources/insurance';

describe('Insurance Resource', () => {
  it('exists', () => {
    expect(insurance).to.not.be.undefined;
    expect(insurance).to.be.a('function');
  });

  it('throws on delete', () => {
    const Insurance = insurance(apiStub());
    return Insurance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
