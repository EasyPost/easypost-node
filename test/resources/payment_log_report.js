import paymentLogReport from '../../src/resources/payment_log_report';

describe('PaymentLogReport Resource', () => {
  it('exists', () => {
    expect(paymentLogReport).to.not.be.undefined;
    expect(paymentLogReport).to.be.a('function');
  });
});
