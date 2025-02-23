/* eslint-disable func-names */
import fs from 'fs';
import { resolve } from 'path';
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Batch from '../../src/models/batch';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Batch Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a batch', async function () {
    const batch = await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    expect(batch).to.be.an.instanceOf(Batch);
    expect(batch.id).to.match(/^batch_/);
    expect(batch.shipments).to.exist;
  });

  it('retrieves a batch', async function () {
    const batch = await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    const retrievedBatch = await client.Batch.retrieve(batch.id);

    expect(retrievedBatch).to.be.an.instanceOf(Batch);
    expect(retrievedBatch.id).to.equal(batch.id);
  });

  it('retrieves all batches', async function () {
    const batches = await client.Batch.all({ page_size: Fixture.pageSize() });

    const addressesArray = batches.batches;

    expect(addressesArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(batches.has_more).to.exist;
    addressesArray.forEach((batch) => {
      expect(batch).to.be.an.instanceOf(Batch);
    });
  });

  it('buys a batch', async function () {
    const batch = await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    const boughtBatch = await client.Batch.buy(batch.id);

    expect(boughtBatch).to.be.an.instanceOf(Batch);
    expect(boughtBatch.num_shipments).to.equal(1);
  });

  it('creates a scanform for a batch', async function () {
    const batch = await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    const boughtBatch = await client.Batch.buy(batch.id);

    if (
      !fs.existsSync(
        resolve(
          __dirname,
          '../cassettes/Batch-Service_3950244400/creates-a-scanform-for-a-batch_397052124',
        ),
      )
    ) {
      await new Promise((res) => setTimeout(res, 5000)); // Wait enough time for the batch to process buying the shipment
    }

    const batchWithScanForm = await client.Batch.createScanForm(boughtBatch.id);

    // We can't assert anything meaningful here because the scanform gets queued for generation and may not be immediately available
    expect(batchWithScanForm).to.be.an.instanceOf(Batch);
  });

  it('adds and removes shipments from a batch', async function () {
    const shipment = await client.Shipment.create(Fixture.oneCallBuyShipment());
    const batch = await client.Batch.create({});

    const addShipmentsResponse = await client.Batch.addShipments(batch.id, [shipment.id]);
    expect(addShipmentsResponse.num_shipments).to.equal(1);

    const removeShipmentsResponse = await client.Batch.removeShipments(batch.id, [shipment.id]);
    expect(removeShipmentsResponse.num_shipments).to.equal(0);
  });

  it('generates a label for a batch', async function () {
    const batch = await client.Batch.create({
      shipments: [Fixture.oneCallBuyShipment()],
    });

    const boughtBatch = await client.Batch.buy(batch.id);

    if (
      !fs.existsSync(
        resolve(
          __dirname,
          '../cassettes/Batch-Service_3950244400/generates-a-label-for-a-batch_2376202846',
        ),
      )
    ) {
      await new Promise((res) => setTimeout(res, 5000)); // Wait enough time for the batch to process buying the shipment
    }

    const batchWithLabel = await client.Batch.generateLabel(boughtBatch.id, 'ZPL');

    // We can't assert anything meaningful here because the label gets queued for generation and may not be immediately available
    expect(batchWithLabel).to.be.an.instanceOf(Batch);
  });
});
