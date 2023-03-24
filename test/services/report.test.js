/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import Report from '../../src/models/report';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Report Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a report', async function () {
    const report = await this.client.Report.create({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
    });

    expect(report).to.be.an.instanceOf(Report);
    expect(report.id).to.match(/^shprep_/);
  });

  it(`creates a report by specifying columns`, async function () {
    const report = await this.client.Report.create({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
      columns: ['usps_zone'],
    });

    // Reports are queued, so we can't wait for completion.
    // Verifying columns would require parsing CSV. Verify correct parameters via URL in cassette
    expect(report).to.be.an.instanceOf(Report);
  });

  it(`creates a report with additional columns`, async function () {
    const report = await this.client.Report.create({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
      additional_columns: ['from_name', 'from_company'],
    });

    // Reports are queued, so we can't wait for completion.
    // Verifying columns would require parsing CSV. Verify correct parameters via URL in cassette
    expect(report).to.be.an.instanceOf(Report);
  });

  it('retrieves a shipment report', async function () {
    const report = await this.client.Report.create({
      start_date: Fixture.reportDate(),
      end_date: Fixture.reportDate(),
      type: Fixture.reportType(),
    });

    const retrievedReport = await this.client.Report.retrieve(report.id);

    expect(retrievedReport).to.be.an.instanceOf(Report);
    expect(retrievedReport.start_date).to.equal(report.start_date);
    expect(retrievedReport.end_date).to.equal(report.end_date);
  });

  it('retrieves all reports', async function () {
    const reports = await this.client.Report.all({
      page_size: Fixture.pageSize(),
      type: Fixture.reportType(),
    });

    const reportsArray = reports.reports;

    expect(reportsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(reports.has_more).to.exist;
    reportsArray.forEach((report) => {
      expect(report).to.be.an.instanceOf(Report);
    });
  });

  it('retrieves next page of reports', async function () {
    try {
      const reports = await this.client.Report.all({
        page_size: Fixture.pageSize(),
        type: Fixture.reportType(),
      });
      const nextPage = await this.client.Report.getNextPage(reports);

      const firstIdOfFirstPage = reports.reports[0].id;
      const firstIdOfSecondPage = nextPage.reports[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });
});
