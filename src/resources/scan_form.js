import T from 'proptypes';
import base from './base';
import address from './address';

export default (api) => {
  const Address = address(api);

  return class ScanForm extends base(api) {
    static _name = 'ScanForm';
    static _url = 'scan_forms';

    static propTypes = {
      id: T.string,
      object: T.string,
      status: T.string,
      message: T.string,
      address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
      tracking_codes: T.arrayOf(T.string),
      form_url: T.string,
      form_file_type: T.string,
      batch_id: T.string,
      created_at: T.oneOfType([T.object, T.string]),
      updated_at: T.oneOfType([T.object, T.string]),
    }

    static delete() {
      return this.notImplemented('delete');
    }

    static wrapJSON(json) {
      return json;
    }

    toJSON() {
      if (this.shipments) {
        return {
          shipments: this.shipments.map((s) => {
            if (typeof s === 'string') {
              return { id: s };
            }

            return { id: s.id };
          }),
        };
      }

      return super.toJSON();
    }
  };
};
