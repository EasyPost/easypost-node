import apiStub from '../helpers/apiStub';
import RequestError from '../../src/errors/request';
import address from '../../src/resources/address';
import order from '../../src/resources/order';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Order Resource', () => {
  it('exists', () => {
    expect(order).to.not.be.undefined;
    expect(order).to.be.a('function');
  });

  it('throws on delete', () => {
    const Order = order(apiStub());
    return Order.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Order = order(apiStub());
    const instance = new Order({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('regenerates rates', () => {
    const stub = apiStub();
    const Order = order(stub);
    const oi = new Order();
    return oi.getRates().then(() => {
      expect(stub.get).to.have.been.called;
      expect(stub.get).to.have.been.calledWith(`orders/${oi.id}/rates`);
    });
  });

  describe('buying', () => {
    let Order;
    let oi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Order = order(stub);
      oi = new Order({ id: '1' });
    });

    it('throws if buy is called and order does not have an id', (done) => {
      oi = new Order();
      oi.buy().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/requires id/);
        done();
      });
    });

    it('throws if buy is called without carrier', (done) => {
      oi.buy().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/carrier/);
        done();
      });
    });

    it('throws if buy is called without service', (done) => {
      oi.buy('carrier').catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/service/);
        done();
      });
    });

    it('calls api.post when buy is called, passing in carrier and service', () => {
      const carrier = 'carrier';
      const service = 'service';
      const data = { carrier, service };

      return oi.buy(carrier, service).then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`orders/${oi.id}/buy`, {
          body: data,
        });
      });
    });

    it('rejects on api failures', (done) => {
      const carrier = 'carrier';
      const service = 'service';

      Order = order(apiStub('order', true));
      oi = new Order({ id: '1' });

      oi.buy(carrier, service).catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('json', () => {
    let Order;
    let stub;
    let Address;

    beforeEach(() => {
      stub = apiStub();
      Order = order(stub);
      Address = address(stub);
    });

    it('turns address properties into ids', () => {
      const toAddress = new Address({ id: '1' });
      const fromAddress = new Address({ id: '2' });
      const returnAddress = new Address({ id: '3' });
      const buyerAddress = new Address({ id: '4' });

      const oi = new Order({
        id: '1',
        to_address: toAddress,
        from_address: fromAddress,
        return_address: returnAddress,
        buyer_address: buyerAddress,
      });

      const json = {
        id: oi.id,
        to_address: { id: toAddress.id },
        from_address: { id: fromAddress.id },
        return_address: { id: returnAddress.id },
        buyer_address: { id: buyerAddress.id },
      };

      expect(oi.toJSON()).to.deep.equal(json);
    });

    it('uses address ids if address properties are ids instead of addresses', () => {
      const toAddress = '1';
      const fromAddress = '2';
      const returnAddress = '3';
      const buyerAddress = '4';

      const oi = new Order({
        id: '1',
        to_address: toAddress,
        from_address: fromAddress,
        return_address: returnAddress,
        buyer_address: buyerAddress,
      });

      const json = {
        id: oi.id,
        to_address: { id: toAddress },
        from_address: { id: fromAddress },
        return_address: { id: returnAddress },
        buyer_address: { id: buyerAddress },
      };

      expect(oi.toJSON()).to.deep.equal(json);
    });
  });
});
