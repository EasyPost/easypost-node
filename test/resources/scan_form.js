import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';

import scanForm from '../../src/resources/scan_form';

describe('ScanForm Resource', () => {
  it('exists', () => {
    expect(scanForm).to.not.be.undefined;
    expect(scanForm).to.be.a('function');
  });

  it('unwraps array responses', () => {
    const ScanForm = scanForm(apiStub());
    const data = [new ScanForm()];
    expect(ScanForm.unwrapAll({ scan_forms: data })).to.deep.equal(data);
  });

  it('throws on delete', () => {
    const ScanForm = scanForm(apiStub());
    return ScanForm.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const ScanForm = scanForm(apiStub());
    const instance = new ScanForm({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('toJSON', () => {
    let ScanForm;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      ScanForm = scanForm(stub);
    });

    it('returns the shipments if available', () => {
      const shipments = { shipments: [{ id: 'shp_123' }] };
      const sf = new ScanForm(shipments);
      expect(sf.toJSON()).to.deep.equal(shipments);
    });

    it('wrapJSON returns the json', () => {
      const json = { foo: 'bar' };
      expect(ScanForm.wrapJSON(json)).to.deep.equal(json);
    });

    it('returns and empty object if there\'s no shipments', () => {
      const sf = new ScanForm();
      expect(sf.toJSON()).to.deep.equal({});
    });
  });
});
