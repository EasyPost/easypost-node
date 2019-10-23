import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import user, { propTypes } from '../../src/resources/user';

describe('User Resource', () => {
  it('exists', () => {
    expect(user).to.not.be.undefined;
    expect(user).to.be.a('function');
  });

  it('throws on all', () => {
    const User = user(apiStub());
    return User.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('retrieves', () => {
    it('without an id passed', () => {
      const stub = apiStub();
      const User = user(stub);
      User.retrieve();
      expect(stub.get).to.have.been.calledWith('users');
    });

    it('with an id passed', () => {
      const stub = apiStub();
      const User = user(stub);
      const id = 'user_123';
      User.retrieve(id);
      expect(stub.get).to.have.been.calledWith(`users/${id}`);
    });
  });

  it('deletes', () => {
    const User = user(apiStub());
    const id = 1;
    return User.delete(id);
  });

  it('deletes an instance', () => {
    const User = user(apiStub());
    const instance = new User({ id: 1 });
    return instance.delete();
  });

  it('has proptypes', () => {
    const User = user(apiStub());
    expect(User.propTypes).to.equal(propTypes);
    expect(propTypes).to.not.be.null;
  });
});
