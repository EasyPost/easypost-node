/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('ScanForm Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  it('creates a scanform', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const scanform = await new this.easypost.ScanForm({
      shipments: [shipment],
    }).save();

    expect(scanform).to.be.an.instanceOf(this.easypost.ScanForm);
    expect(scanform.id).to.match(/^sf_/);
  });

  it('retrieves a scanform', async function () {
    const shipment = await new this.easypost.Shipment(Fixture.oneCallBuyShipment()).save();

    const scanform = await new this.easypost.ScanForm({
      shipments: [shipment],
    }).save();

    const retrievedScanform = await this.easypost.ScanForm.retrieve(scanform.id);

    expect(retrievedScanform).to.be.an.instanceOf(this.easypost.ScanForm);
    delete scanform.shipments; // This lib returns the shipments key as part of the response, remove it for comparison
    expect(retrievedScanform).to.deep.include(scanform);
  });

  it('retrieves all scanforms', async function () {
    const scanforms = await this.easypost.ScanForm.all({
      page_size: Fixture.pageSize(),
    });

    const scanformsArray = scanforms.scan_forms;

    expect(scanformsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(scanforms.has_more).to.not.be.null;
    scanformsArray.forEach((scanform) => {
      expect(scanform).to.be.an.instanceOf(this.easypost.ScanForm);
    });
  });

  it('throws on delete', function () {
    const scanform = new this.easypost.ScanForm({ id: 1 });

    return scanform.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
