import rating from '../../src/resources/rating';
import apiStub from '../helpers/apiStub';
import RequestError from '../../src/errors/request';

//THIS IS THE TEST PART OF IT
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
});