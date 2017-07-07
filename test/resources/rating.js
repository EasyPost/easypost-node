import rating from '../../src/resources/rating';
import NotImplementedError from '../../src/errors/notImplemented';
import apiStub from '../helpers/apiStub';
import RequestError from '../../src/errors/request';

describe('Rating Resource', () => {
  it('exists', () => {
    expect(rating).to.not.be.undefined;
    expect(rating).to.be.a('function');
  });

  it('throws on all', () => {
    const Rating = rating(apiStub());
    return Rating.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const Rating = rating(apiStub());
    return Rating.delete().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on retrieve', () => {
    const Rating = rating(apiStub());
    return Rating.retrieve().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('calls api.post when save is called and with correct url', () => {
      const stub = apiStub();
      const Rating = rating(stub);
      const rt = new Rating({});
      rt.save();

      expect(stub.post).to.have.been.called;
      expect(stub.post).to.have.been.calledWith('rating/v1/rates');
  });
});
