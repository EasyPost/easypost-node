/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../helpers/setup_polly';
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';

describe('CreditCard Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('fund a credit card', async function () {
    // Skipping due to the lack of an available real credit card in tests
    const creditCard = await this.easypost.CreditCard.fund('2000', 'primary');

    expect(creditCard).to.not.undefined;
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('delete a credit card', async function () {
    // Skipping due to the lack of an available real credit card in tests
    const deletedCreditCard = await this.easypost.CreditCard.delete('card_1234');

    expect(deletedCreditCard).to.not.undefined;
  });

  it('throws on retrieve', function () {
    const paymentMethod = new this.easypost.CreditCard({ id: 1 });

    return paymentMethod.retrieve().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', function () {
    const paymentMethod = new this.easypost.CreditCard({ id: 1 });

    return paymentMethod.save().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
