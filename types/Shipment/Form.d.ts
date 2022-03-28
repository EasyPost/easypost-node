import { IDatedObject, IObjectWithId } from '../base';

/**
 * @see https://www.easypost.com/docs/api/node#form-object
 */
export declare interface IForm extends IObjectWithId<'Form'>, IDatedObject {
  /**
   * The type of form that we returned, can be one of "high_value_report", "commercial_invoice", "cod_return_label", "order_summary", "cn22"
   */
  form_type:
    | 'high_value_report'
    | 'commercial_invoice'
    | 'cod_return_label'
    | 'order_summary'
    | 'cn22';

  /**
   * The address we return the form back at
   */
  form_url: string;

  /**
   * If we have submitted the form to the carrier on behalf of the customer
   */
  submitted_electronically: boolean;
}
