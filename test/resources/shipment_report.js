import shipmentReport from '../../src/resources/shipment_report';

describe('ShipmentReport Resource', () => {
  it('exists', () => {
    expect(shipmentReport).to.not.be.undefined;
    expect(shipmentReport).to.be.a('function');
  });
});
