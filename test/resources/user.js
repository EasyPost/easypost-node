import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import user from '../../src/resources/user';

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
});
