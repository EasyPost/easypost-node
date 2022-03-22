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
    setupPolly.stripCreds(server);
  });

  it(`create a report with columns`, async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'shipment',
      columns: ['usps_zone'],
    }).save();

    // Reports are queued, so we can't wait for completion.
    // Verifying columns would require parsing CSV. Verify correct parameters via URL in cassette
    expect(report).to.be.an.instanceOf(this.easypost.Report);
  });

  it(`create a report with additional columns`, async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'shipment',
      additional_columns: ['from_name', 'from_company'],
    }).save();

    // Reports are queued, so we can't wait for completion.
    // Verifying columns would require parsing CSV. Verify correct parameters via URL in cassette
    expect(report).to.be.an.instanceOf(this.easypost.Report);
  });

  it('creates a payment_log report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'payment_log',
    }).save();

    expect(report).to.be.an.instanceOf(this.easypost.Report);
    expect(report.id).to.match(/^plrep_/);
  });

  it('creates a refund report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'refund',
    }).save();

    expect(report).to.be.an.instanceOf(this.easypost.Report);
    expect(report.id).to.match(/^refrep_/);
  });

  it('creates a shipment report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'shipment',
    }).save();

    expect(report).to.be.an.instanceOf(this.easypost.Report);
    expect(report.id).to.match(/^shprep_/);
  });

  it('creates a shipment_invoice report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'shipment_invoice',
    }).save();

    expect(report).to.be.an.instanceOf(this.easypost.Report);
    expect(report.id).to.match(/^shpinvrep_/);
  });

  it('creates a tracker report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'tracker',
    }).save();

    expect(report).to.be.an.instanceOf(this.easypost.Report);
    expect(report.id).to.match(/^trkrep_/);
  });

  it('retrieves a payment_log report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'payment_log',
    }).save();

    const retrievedReport = await this.easypost.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(this.easypost.Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves a refund report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'refund',
    }).save();

    const retrievedReport = await this.easypost.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(this.easypost.Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves a shipment report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'shipment',
    }).save();

    const retrievedReport = await this.easypost.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(this.easypost.Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves a shipment_invoice report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'shipment_invoice',
    }).save();

    const retrievedReport = await this.easypost.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(this.easypost.Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves a tracker report', async function () {
    const report = await new this.easypost.Report({
      start_date: Fixture.reportStartDate(),
      end_date: Fixture.reportEndDate(),
      type: 'tracker',
    }).save();

    const retrievedReport = await this.easypost.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(this.easypost.Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves all reports', async function () {
    const reports = await this.easypost.Report.all('shipment', {
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
