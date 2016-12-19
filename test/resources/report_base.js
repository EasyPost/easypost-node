import reportBase from '../../src/resources/report_base';
import apiStub from '../helpers/apiStub';

describe('Report Base Resource', () => {
  it('exists', () => {
    expect(reportBase).to.not.be.undefined;
    expect(reportBase).to.be.a('function');
  });

  it('unwraps array responses', () => {
    const Report = reportBase(apiStub());
    const data = [new Report()];
    expect(Report.unwrapAll({ reports: data })).to.deep.equal(data);
  });
});
