import apiStub from '../helpers/apiStub';
import RequestError from '../../src/errors/request';
import NotImplementedError from '../../src/errors/notImplemented';

import address from '../../src/resources/address';
import parcel from '../../src/resources/parcel';
import customsInfo from '../../src/resources/customsInfo';
import insurance from '../../src/resources/insurance';
import tracker from '../../src/resources/tracker';

import shipment from '../../src/resources/shipment';

describe('Shipment Resource', () => {
  it('exists', () => {
    expect(shipment).to.not.be.undefined;
    expect(shipment).to.be.a('function');
  });

  it('throws on delete', () => {
    const Shipment = shipment(apiStub());
    return Shipment.delete().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Shipment = shipment(apiStub());
    const instance = new Shipment({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('buying', () => {
    let Shipment;
    let si;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      si = new Shipment({ id: '1' });
    });

    it('throws if buy is called and shipment does not have an id', (done) => {
      si = new Shipment();
      si.buy().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('throws if buy is called without rate', (done) => {
      si.buy().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/rate/);
        done();
      });
    });

    it('calls api.post when buy is called, passing in rate and insuranceAmount', () => {
      const rate = 'rate';
      const insuranceAmount = 100;
      const data = { rate: { id: 'rate' }, insurance: insuranceAmount };

      return si.buy(rate, insuranceAmount).then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`shipments/${si.id}/buy`, {
          body: data,
        });
      });
    });

    it('uses rate.id if rate is an object', () => {
      const rate = { id: '1' };
      const data = { rate: { id: rate.id } };

      return si.buy(rate).then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`shipments/${si.id}/buy`, {
          body: data,
        });
      });
    });

    it('rejects on api failures', (done) => {
      const carrier = 'carrier';
      const service = 'service';

      Shipment = shipment(apiStub('shipment', true));
      si = new Shipment({ id: '1' });

      si.buy(carrier, service).catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('insuring', () => {
    let Shipment;
    let si;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      si = new Shipment({ id: '1' });
    });

    it('throws if insure is called and shipment does not have an id', (done) => {
      si = new Shipment();
      si.insure().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('throws if insure is called without amount', (done) => {
      si.insure().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/amount/);
        done();
      });
    });

    it('calls api.post when insure is called, passing in amount', () => {
      const amount = 100;
      const data = { amount };

      return si.insure(amount).then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`shipments/${si.id}/insure`, {
          body: data,
        });
      });
    });

    it('rejects on api failures', (done) => {
      const amount = 100;

      Shipment = shipment(apiStub('shipment', true));
      si = new Shipment({ id: '1' });

      si.insure(amount).catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });


  describe('converting label format', () => {
    let Shipment;
    let si;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      si = new Shipment({ id: '1' });
    });

    it('throws if convertLabelFormat is called and shipment does not have an id', (done) => {
      si = new Shipment();
      si.convertLabelFormat().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('throws if convertLabelFormat is called without format', (done) => {
      si.convertLabelFormat().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/format/);
        done();
      });
    });

    it('calls api.post when convertLabelFormat is called, passing in format and method', () => {
      const format = 'png';
      const data = { file_format: format };

      return si.convertLabelFormat(format).then(() => {
        expect(stub.get).to.have.been.called;
        expect(stub.get).to.have.been.calledWith(`shipments/${si.id}/label`, { query: data });
      });
    });

    it('rejects on api failures', (done) => {
      const format = 'png';

      Shipment = shipment(apiStub('shipment', true));
      si = new Shipment({ id: '1' });

      si.convertLabelFormat(format).catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('regenerating rates', () => {
    let Shipment;
    let si;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      si = new Shipment({ id: '1' });
    });

    it('throws if regenerateRates is called and shipment does not have an id', (done) => {
      si = new Shipment();
      si.regenerateRates().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('calls api.post when regenerateRates is called', () => {
      return si.regenerateRates().then(() => {
        expect(stub.get).to.have.been.called;
        expect(stub.get).to.have.been.calledWith(`shipments/${si.id}/rates`);
      });
    });

    it('rejects on api failures', (done) => {
      Shipment = shipment(apiStub('shipment', true));
      si = new Shipment({ id: '1' });

      si.regenerateRates().catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('refund', () => {
    let Shipment;
    let si;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      si = new Shipment({ id: '1' });
    });

    it('throws if refund is called and shipment does not have an id', (done) => {
      si = new Shipment();
      si.refund().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('calls api.post when refund is called', () => {
      return si.refund().then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`shipments/${si.id}/refund`);
      });
    });

    it('rejects on api failures', (done) => {
      Shipment = shipment(apiStub('shipment', true));
      si = new Shipment({ id: '1' });

      si.refund().catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('return', () => {
    let Shipment;
    let si;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      si = new Shipment({ id: '1' });
    });

    it('throws if return is called and shipment does not have an id', (done) => {
      si = new Shipment();
      si.return().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('throws if return is called and shipment does not have a to_address or from_address', (done) => {
      si.return().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/to_address/);
        done();
      });
    });

    it('calls api.post when return is called', () => {
      const Address = address(stub);
      const toAddress = new Address({ id: '1' });
      const fromAddress = new Address({ id: '2' });

      si.to_address = toAddress;
      si.from_address = fromAddress;

      return si.return().then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`shipments/${si.id}`);
      });
    });

    it('rejects on api failures', (done) => {
      const Address = address(stub);
      const toAddress = new Address({ id: '1' });
      const fromAddress = new Address({ id: '2' });

      Shipment = shipment(apiStub('shipment', true));
      si = new Shipment({ id: '1' });
      si.to_address = toAddress;
      si.from_address = fromAddress;

      si.return().catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('lowest rate', () => {
    let Shipment;
    let si;

    beforeEach(() => {
      Shipment = shipment(apiStub());
      si = new Shipment({ id: '1' });
    });

    it('returns undefined if there are no rates', () => {
      si = new Shipment();
      expect(si.lowestRate()).to.be.undefined;
    });

    it('returns the cheapest rate', () => {
      const lowestRate = { rate: 1 };
      const middleRate = { rate: 1.5 };
      const highestRate = { rate: 2 };

      si = new Shipment({ rates: [middleRate, lowestRate, highestRate] });
      expect(si.lowestRate()).to.equal(lowestRate);
    });

    it('returns the cheapest rate for specific carriers', () => {
      const lowestRate = { rate: 1, carrier: 'b' };
      const middleRate = { rate: 1.5, carrier: 'a' };
      const highestRate = { rate: 2, carrier: 'a' };

      si = new Shipment({ rates: [middleRate, lowestRate, highestRate] });
      expect(si.lowestRate(['a'])).to.equal(middleRate);
    });

    it('returns the cheapest rate for specific carriers and services', () => {
      const lowestRate = { rate: 1, carrier: 'a', service: 'a' };
      const middleRate = { rate: 1.5, carrier: 'a', service: 'b' };
      const highestRate = { rate: 2, carrier: 'a', service: 'b' };

      si = new Shipment({ rates: [middleRate, lowestRate, highestRate] });
      expect(si.lowestRate(['a'], ['b'])).to.equal(middleRate);
    });
  });

  describe('json', () => {
    let Shipment;
    let stub;
    let Address;
    let Parcel;
    let CustomsInfo;
    let Insurance;
    let Tracker;

    beforeEach(() => {
      stub = apiStub();
      Shipment = shipment(stub);
      Address = address(stub);
      Parcel = parcel(stub);
      CustomsInfo = customsInfo(stub);
      Insurance = insurance(stub);
      Tracker = tracker(stub);
    });

    it('turns object properties into ids', () => {
      const toAddress = new Address({ id: '1' });
      const fromAddress = new Address({ id: '2' });
      const returnAddress = new Address({ id: '3' });
      const buyerAddress = new Address({ id: '4' });
      const shipmentParcel = new Parcel({ id: 'p_1' });
      const shipmentCustomsInfo = new CustomsInfo({ id: 'ci_1' });
      const shipmentInsurance = new Insurance({ id: 'i_1' });
      const shipmentTracker = new Tracker({ id: 't_1' });

      const si = new Shipment({
        id: '1',
        to_address: toAddress,
        from_address: fromAddress,
        return_address: returnAddress,
        buyer_address: buyerAddress,
        customs_info: shipmentCustomsInfo,
        parcel: shipmentParcel,
        insurance: shipmentInsurance,
        tracker: shipmentTracker,
      });

      const json = {
        id: si.id,
        to_address: { id: toAddress.id },
        from_address: { id: fromAddress.id },
        return_address: { id: returnAddress.id },
        buyer_address: { id: buyerAddress.id },
        insurance: { id: shipmentInsurance.id },
        tracker: { id: shipmentTracker.id },
        parcel: { id: shipmentParcel.id },
        customs_info: { id: shipmentCustomsInfo.id },
      };

      expect(si.toJSON()).to.deep.equal(json);
    });

    it('uses address ids if address properties are ids instead of addresses', () => {
      const toAddress = '1';
      const fromAddress = '2';
      const returnAddress = '3';
      const buyerAddress = '4';
      const shipmentParcel = 'p_1';
      const shipmentCustomsInfo = 'ci_1';
      const shipmentInsurance = 'i_1';
      const shipmentTracker = 't_1';

      const si = new Shipment({
        id: '1',
        to_address: toAddress,
        from_address: fromAddress,
        return_address: returnAddress,
        buyer_address: buyerAddress,
        customs_info: shipmentCustomsInfo,
        parcel: shipmentParcel,
        insurance: shipmentInsurance,
        tracker: shipmentTracker,
      });

      const json = {
        id: si.id,
        to_address: { id: toAddress },
        from_address: { id: fromAddress },
        return_address: { id: returnAddress },
        buyer_address: { id: buyerAddress },
        insurance: { id: shipmentInsurance },
        tracker: { id: shipmentTracker },
        parcel: { id: shipmentParcel },
        customs_info: { id: shipmentCustomsInfo },
      };

      expect(si.toJSON()).to.deep.equal(json);
    });
  });
});
