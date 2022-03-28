/**
 * @see https://www.easypost.com/docs/api/node#carrier-account-field-object
 */
export declare interface ICarrierAccountField {
  /**
   * Each key in the sub-objects of a CarrierAccount's fields is the name of a settable field
   */
  key: string;

  /**
   * The visibility value is used to control form field types, and is discussed in the CarrierType section
   */
  visibility: string;

  /**
   * The label value is used in form rendering to display a more precise field name
   */
  label: string;

  /**
   * Checkbox fields use "0" and "1" as False and True, all other field types present plaintext, partly-masked, or masked credential data for reference
   */
  value: string;
}
