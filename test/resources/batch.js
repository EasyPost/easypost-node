import { default as batch, DEFAULT_LABEL_FORMAT } from '../../src/resources/batch';
import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

describe('Batch Resource', () => {
  it('exists', () => {
    expect(batch).to.not.be.undefined;
    expect(batch).to.be.a('function');
  });

  it('throws on delete', () => {
    const Batch = batch(apiStub());
    return Batch.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const Batch = batch(apiStub());
    const instance = new Batch({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('managing shipments', () => {
    const shipmentId = '1';
    const shipmentIds = ['1', '2'];
    let Batch;
    let bi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Batch = batch(stub);
      bi = new Batch({ id: '1' });
    });

    describe('adding shipments', () => {
      it('throws if addShipment is called and batch does not have an id', () => {
        bi = new Batch();
        expect(() => bi.addShipment()).to.throw(/requires id/);
      });

      it('throws if addShipment is called without an id', () => {
        expect(() => bi.addShipment()).to.throw(/shipmentId/);
      });

      it('calls api.post when addShipment is called with a shipment id', () => {
        bi.addShipment(shipmentId);
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith('batches/1/add_shipments', {
          body: {
            shipments: [{ id: shipmentId }],
          },
        });
      });

      it('throws if addShipments is called and batch does not have an id', () => {
        bi = new Batch();
        expect(() => bi.addShipments()).to.throw(/requires id/);
      });

      it('throws if addShipments is called without an id', () => {
        expect(() => bi.addShipments()).to.throw(/shipmentIds/);
      });

      it('calls api.post when addShipments is called with shipment ids', () => {
        bi.addShipments(shipmentIds);
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith('batches/1/add_shipments', {
          body: {
            shipments: [{ id: shipmentIds[0] }, { id: shipmentIds[1] }],
          },
        });
      });
    });

    describe('removing shipments', () => {
      it('throws if removeShipment is called and batch does not have an id', () => {
        bi = new Batch();
        expect(() => bi.removeShipment()).to.throw(/requires id/);
      });

      it('throws if removeShipment is called without an id', () => {
        expect(() => bi.removeShipment()).to.throw(/shipmentId/);
      });

      it('calls api.post when removeShipment is called with a shipment id', () => {
        bi.removeShipment(shipmentId);
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith('batches/1/remove_shipments', {
          body: {
            shipments: [{ id: shipmentId }],
          },
        });
      });

      it('throws if removeShipments is called and batch does not have an id', () => {
        bi = new Batch();
        expect(() => bi.removeShipments()).to.throw(/requires id/);
      });

      it('throws if removeShipments is called without an id', () => {
        expect(() => bi.removeShipments()).to.throw(/shipmentIds/);
      });

      it('calls api.post when removeShipments is called with shipment ids', () => {
        bi.removeShipments(shipmentIds);
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith('batches/1/remove_shipments', {
          body: {
            shipments: [{ id: shipmentIds[0] }, { id: shipmentIds[1] }],
          },
        });
      });
    });
  });

  describe('managing labels', () => {
    let Batch;
    let bi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Batch = batch(stub);
      bi = new Batch({ id: '1' });
    });

    it('throws if generateLabel is called and batch does not have an id', () => {
      bi = new Batch();
      expect(() => bi.generateLabel()).to.throw(/requires id/);
    });

    it('calls api.post when generateLabel is called, defaulting to pdf', () => {
      bi.generateLabel();
      expect(stub.post).to.have.been.called;
      expect(stub.post).to.have.been.calledWith('batches/1/label', {
        body: {
          file_format: DEFAULT_LABEL_FORMAT,
        },
      });
    });

    it('calls api.post when generateLabel is called with a format', () => {
      const format = 'abc';

      bi.generateLabel(format);
      expect(stub.post).to.have.been.called;
      expect(stub.post).to.have.been.calledWith('batches/1/label', {
        body: {
          file_format: format,
        },
      });
    });
  });

  describe('managing scan forms', () => {
    let Batch;
    let bi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Batch = batch(stub);
      bi = new Batch({ id: '1' });
    });

    it('throws if createScanForm is called and batch does not have an id', () => {
      bi = new Batch();
      expect(() => bi.createScanForm()).to.throw(/requires id/);
    });

    it('calls api.post when createScanForm is called', () => {
      bi.createScanForm();
      expect(stub.post).to.have.been.called;
      expect(stub.post).to.have.been.calledWith('batches/1/scan_form');
    });
  });

  describe('buying', () => {
    let Batch;
    let bi;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      Batch = batch(stub);
      bi = new Batch({ id: '1', shipments: [{ id: 1 }, { id: 2 }] });
    });

    it('throws if buy is called and batch does not have an id', () => {
      bi = new Batch();
      expect(() => bi.buy()).to.throw(/requires id/);
    });

    it('throws if buy is called and batch does not have shipments', () => {
      bi = new Batch({ id: 'batch_1' });
      expect(() => bi.buy()).to.throw(/requires shipments/);
    });

    it('calls api.post when buy is called', () => {
      bi.buy();
      expect(stub.post).to.have.been.called;
      expect(stub.post).to.have.been.calledWith('batches/1/buy');
    });
  });
});
