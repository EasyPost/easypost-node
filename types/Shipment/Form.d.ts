import { IDatedObject, IObjectWithId } from '../base';

/**
 * @see https://www.easypost.com/docs/api/node#form-object
 */
export declare interface IForm extends IObjectWithId<'Form'>, IDatedObject {
  /**
   * The type of form that we returned, can be one of "cn22", "cod_return_label", "commercial_invoice", "high_value_report", "label_qr_code", "nafta_certificate_of_origin", "order_summary", "return_packing_slip", "rma_qr_code"
   */
  form_type:
    | 'cn22'
    | 'cod_return_label'
    | 'commercial_invoice'
    | 'high_value_report'
    | 'label_qr_code'
    | 'nafta_certificate_of_origin'
    | 'order_summary'
    | 'return_packing_slip'
    | 'rma_qr_code';

  /**
   * The address we return the form back at
   */
  form_url: string;

  /**
   * If we have submitted the form to the carrier on behalf of the customer
   */
  submitted_electronically: boolean;
}
