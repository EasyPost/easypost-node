import T from 'proptypes';
import base from './base';
import { propTypes as addressPropTypes } from './address';

export const propTypes = {
  id: T.string,
  object: T.string,
  status: T.string,
  message: T.string,
  address: T.oneOfType([T.string, T.shape(addressPropTypes)]),
  tracking_codes: T.arrayOf(T.string),
  form_url: T.string,
  form_file_type: T.string,
  batch_id: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
};

export default (api) =>
  class ScanForm extends base(api) {
    static propTypes = propTypes;

    static _name = 'ScanForm';

    static _url = 'scan_forms';

    static delete() {
      return this.notImplemented('delete');
    }

    /**
     * Override the wrapJSON function for this object.
     * @param {object} json
     * @returns
     */
    static wrapJSON(json) {
      return json;
    }

    /**
     * Override the toJSON function for this object.
     * @returns {object}
     */
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
