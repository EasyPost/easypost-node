import apiStub from '../helpers/api_stub';
import NotImplementedError from '../../src/errors/not_implemented';
import rate from '../../src/resources/rate';

describe('Rate Resource', () => {
  it('exists', () => {
    expect(rate).to.not.be.undefined;
    expect(rate).to.be.a('function');
  });

  it('unwraps array responses', () => {
    const Rate = rate(apiStub());
    const data = [new Rate()];
    expect(Rate.unwrapAll({ rates: data })).to.deep.equal(data);
  });

  it('throws on all', () => {
    const Rate = rate(apiStub());
    return Rate.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });

  it('throws on delete', () => {
    const Rate = rate(apiStub());
    return Rate.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });

  it('throws on save', () => {
    const Rate = rate(apiStub());
    return Rate.delete('id').then(
      () => {},
      (err) => {
        expect(err).to.be.an.instanceOf(NotImplementedError);
      },
    );
  });
});
