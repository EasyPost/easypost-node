/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../helpers/setup_polly';
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';

describe('PaymentMethod Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('retrieves all payment methods', async function () {
    const paymentMethods = await this.easypost.PaymentMethod.all();

    expect(paymentMethods.primary_payment_method).to.not.undefined;
    expect(paymentMethods.secondary_payment_method).to.not.be.undefined;
  });

  it('throws on retrieve', function () {
    const paymentMethod = new this.easypost.PaymentMethod({ id: 1 });

    return paymentMethod.retrieve().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', function () {
    const paymentMethod = new this.easypost.PaymentMethod({ id: 1 });

    return paymentMethod.save().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', function () {
    const paymentMethod = new this.easypost.PaymentMethod({ id: 1 });

    return paymentMethod.delete().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
