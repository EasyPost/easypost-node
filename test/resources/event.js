import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import event from '../../src/resources/event';


describe('Event Resource', () => {
  it('exists', () => {
    expect(event).to.not.be.undefined;
    expect(event).to.be.a('function');
  });

  it('unwraps array responses', () => {
    const Event = event(apiStub());
    const data = [new Event()];
    expect(Event.unwrapAll({ events: data })).to.deep.equal(data);
  });

  it('throws on delete', () => {
    const Event = event(apiStub());
    return Event.delete('id').then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', () => {
    const Event = event(apiStub());
    return Event.delete('id').then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
