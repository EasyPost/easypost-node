import report from '../../src/resources/report';
import NotImplementedError from '../../src/errors/notImplemented';
import apiStub from '../helpers/apiStub';

describe('Report Resource', () => {
  it('exists', () => {
    expect(report).to.not.be.undefined;
    expect(report).to.be.a('function');
  });

  it('sets a _url instance var if type is passed to the constructor', () => {
    const stub = apiStub();
    const Report = report(stub);
    const rep = new Report({ type: 'shipment' });
    expect(rep._url).to.equal('reports/shipment');
  });

  it('constructs the url for reports', () => {
    const stub = apiStub();
    const Report = report(stub);
    expect(Report.constructUrl('foo')).to.equal('reports/foo');
  });

  it('calls retrieve using the type that is passed', () => {
    const stub = apiStub();
    const Report = report(stub);

    return Report.retrieve('id_123').then(() => {
      expect(stub.get).to.have.been.calledOnce;
      expect(stub.get).to.have.been.calledWith('reports/id_123');
    });
  });

  it('calls all using the type that is passed', () => {
    const stub = apiStub('', false, { reports: [] });
    const Report = report(stub);

    return Report.all('shipment').then(() => {
      expect(stub.get).to.have.been.calledOnce;
      expect(stub.get).to.have.been.calledWith('reports/shipment');
    });
  });

  describe('toJSON', () => {
    let ReportBase;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      ReportBase = report(stub);
    });

    it('wrapJSON returns the json', () => {
      const json = { foo: 'bar' };
      expect(ReportBase.wrapJSON(json)).to.deep.equal(json);
    });
  });

  it('unwraps array responses', () => {
    const Report = report(apiStub());
    const data = [new Report()];
    expect(Report.unwrapAll({ reports: data })).to.deep.equal(data);
  });

  it('throws on delete', () => {
    const Report = report(apiStub());
    return Report.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Report = report(apiStub());
    const instance = new Report({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
