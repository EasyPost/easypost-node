import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/shipments/forms Form} represents a printable form for a {@link Shipment shipment}, such as a return packing slip, QR code or international shipping form.
 * @public
 * @extends EasyPostObject
 */
export default class Form extends EasyPostObject {
  declare form_type:
    | 'cn22'
    | 'cod_return_label'
    | 'commercial_invoice'
    | 'high_value_report'
    | 'label_qr_code'
    | 'nafta_certificate_of_origin'
    | 'order_summary'
    | 'return_packing_slip'
    | 'rma_qr_code';
  declare form_url: string | null;
  declare submitted_electronically: boolean | null;
}
