import apiStub from '../helpers/apiStub';
import RequestError from '../../src/errors/request';
import address from '../../src/resources/address';
import pickup from '../../src/resources/pickup';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Pickup Resource', () => {
  it('exists', () => {
    expect(pickup).to.not.be.undefined;
    expect(pickup).to.be.a('function');
  });

  it('throws on all', () => {
    const Pickup = pickup(apiStub());
    return Pickup.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const Pickup = pickup(apiStub());
    return Pickup.delete().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Pickup = pickup(apiStub());
    const instance = new Pickup({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('buying', () => {
    let Pickup;
    let pi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Pickup = pickup(stub);
      pi = new Pickup({ id: '1' });
    });

    it('throws if buy is called and pickup does not have an id', () => {
      pi = new Pickup();
      pi.buy().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
      });
    });

    it('throws if buy is called without carrier', () => {
      pi.buy().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/carrier/);
      });
    });

    it('throws if buy is called without service', () => {
      pi.buy('carrier').catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/service/);
      });
    });

    it('calls api.post when buy is called, passing in carrier and service', () => {
      const carrier = 'carrier';
      const service = 'service';
      const data = { carrier, service };

      return pi.buy(carrier, service).then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`pickups/${pi.id}/buy`, {
          body: data,
        });
      });
    });

    it('rejects on api failures', (done) => {
      const carrier = 'carrier';
      const service = 'service';

      Pickup = pickup(apiStub('pickup', true));
      pi = new Pickup({ id: '1' });

      pi.buy(carrier, service).catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('cancelling', () => {
    let Pickup;
    let pi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Pickup = pickup(stub);
      pi = new Pickup({ id: '1' });
    });

    it('throws if cancel is called and pickup does not have an id', (done) => {
      pi = new Pickup();
      pi.cancel().catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.match(/id/);
        done();
      });
    });

    it('calls api.post when cancel is called', () => {
      return pi.cancel().then(() => {
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith(`pickups/${pi.id}/cancel`);
      });
    });

    it('rejects on api failures', (done) => {
      Pickup = pickup(apiStub('pickup', true));
      pi = new Pickup({ id: '1' });

      pi.cancel().catch((e) => {
        expect(e).to.be.an.instanceof(RequestError);
        done();
      });
    });
  });

  describe('json', () => {
    let Pickup;
    let stub;
    let Address;

    beforeEach(() => {
      stub = apiStub();
      Pickup = pickup(stub);
      Address = address(stub);
    });

    it('turns address and shipment properties into ids', () => {
      const pickupAddress = new Address({ id: '1' });

      const pi = new Pickup({
        id: '1',
        address: pickupAddress,
      });

      const json = {
        id: pi.id,
        address: { id: pickupAddress.id },
      };

      expect(pi.toJSON()).to.deep.equal(json);
    });

    it('uses address ids if address properties are ids instead of addresses', () => {
      const pickupAddress = '1';

      const pi = new Pickup({
        id: '1',
        address: pickupAddress,
      });

      const json = {
        id: pi.id,
        address: { id: pickupAddress },
      };

      expect(pi.toJSON()).to.deep.equal(json);
    });
  });
});
