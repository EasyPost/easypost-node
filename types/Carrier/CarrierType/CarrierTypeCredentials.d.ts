/**
 * @see https://www.easypost.com/docs/api/node#carrier-type-credentials-object
 */
export declare interface ICarrierTypeCredentials {
  /**
   * The key for each attribute sub-object within credentials is the name of the attribute for submission on CarrierAccounts
   */
  name: string;

  /**
   * There are five possible values, which encode the security need and storage type for each attribute: "visible", "checkbox", "fake", "password", and "masked"
   */
  visibility: 'visible' | 'checkbox' | 'fake' | 'password' | 'masked';

  /**
   * Most attributes have generic names, so for clarity a "label" value is provided for clearer representation when rendering forms
   */
  label: string;
}
