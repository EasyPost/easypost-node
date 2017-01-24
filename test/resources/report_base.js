import reportBase from '../../src/resources/report_base';
import apiStub from '../helpers/apiStub';

describe('Report Base Resource', () => {
  it('exists', () => {
    expect(reportBase).to.not.be.undefined;
    expect(reportBase).to.be.a('function');
  });

  describe('toJSON', () => {
    let ReportBase;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      ReportBase = reportBase(stub);
    });

    it('wrapJSON returns the json', () => {
      const json = { foo: 'bar' };
      expect(ReportBase.wrapJSON(json)).to.deep.equal(json);
    });
  });

  it('unwraps array responses', () => {
    const Report = reportBase(apiStub());
    const data = [new Report()];
    expect(Report.unwrapAll({ reports: data })).to.deep.equal(data);
  });
});
