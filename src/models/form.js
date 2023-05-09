import EasyPostObject from './easypost_object';

/**
 * A {@link https://www.easypost.com/docs/api/node#forms Form} represents a printable form for a {@link Shipment shipment}, such as a return packing slip, QR code or international shipping form.
 * @public
 * @extends EasyPostObject
 */
export default class Form extends EasyPostObject {
  static form_type;
  static form_url;
  static submitted_electronically;
}
