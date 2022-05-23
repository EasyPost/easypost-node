/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Report Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCassettes(server);
  });

  it('creates a report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
    }).save();

    expect(report).to.be.an.instanceOf(this.easypost.Report);
    expect(report.id).to.match(/^shprep_/);
  });

  it(`creates a report by specifying columns`, async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
      columns: ['usps_zone'],
    }).save();

    // Reports are queued, so we can't wait for completion.
    // Verifying columns would require parsing CSV. Verify correct parameters via URL in cassette
    expect(report).to.be.an.instanceOf(this.easypost.Report);
  });

  it(`creates a report with additional columns`, async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
      additional_columns: ['from_name', 'from_company'],
    }).save();

    // Reports are queued, so we can't wait for completion.
    // Verifying columns would require parsing CSV. Verify correct parameters via URL in cassette
    expect(report).to.be.an.instanceOf(this.easypost.Report);
  });

  it('retrieves a shipment report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
    }).save();

    const retrievedReport = await this.easypost.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(this.easypost.Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves all reports', async function () {
    const reports = await this.easypost.Report.all(Fixture.reportType(), {
      page_size: Fixture.pageSize(),
    });

    const reportsArray = reports.reports;

    expect(reportsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(reports.has_more).to.not.be.null;
    reportsArray.forEach((report) => {
      expect(report).to.be.an.instanceOf(this.easypost.Report);
    });
  });

  it('throws on delete', function () {
    const report = new this.easypost.Report({ id: 1 });

    return report.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
