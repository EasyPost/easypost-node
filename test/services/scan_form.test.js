/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';
import ScanForm from '../../src/models/scan_form';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

describe('ScanForm Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a scanform', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const scanform = await client.ScanForm.create({
      shipments: [shipment],
    });

    expect(scanform).to.be.an.instanceOf(ScanForm);
    expect(scanform.id).to.match(/^sf_/);
  });

  it('retrieves a scanform', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());

    const scanform = await client.ScanForm.create({
      shipments: [shipment],
    });

    const retrievedScanform = await client.ScanForm.retrieve(scanform.id);

    expect(retrievedScanform).to.be.an.instanceOf(ScanForm);
    expect(withoutParams(retrievedScanform)).to.deep.include(withoutParams(scanform));
  });

  it('retrieves all scanforms', async function () {
    const scanforms = await client.ScanForm.all({
      page_size: Fixture.pageSize(),
    });

    const scanformsArray = scanforms.scan_forms;

    expect(scanformsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(scanforms.has_more).to.exist;
    scanformsArray.forEach((scanform) => {
      expect(scanform).to.be.an.instanceOf(ScanForm);
    });
  });

  it('retrieves next page of scanforms', async function () {
    try {
      const scanforms = await client.ScanForm.all({ page_size: Fixture.pageSize() });
      const nextPage = await client.ScanForm.getNextPage(scanforms, Fixture.pageSize());

      const firstIdOfFirstPage = scanforms.scan_forms[0].id;
      const firstIdOfSecondPage = nextPage.scan_forms[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });
});
