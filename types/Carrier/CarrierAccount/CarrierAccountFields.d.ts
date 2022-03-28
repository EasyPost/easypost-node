import { ICarrierAccountField } from './CarrierAccountField';

/**
 * @see https://www.easypost.com/docs/api/node#carrier-account-fields-object
 */
export declare interface ICarrierAccountFields {
  /**
   * Credentials used in the production environment.
   */
  credentials: ICarrierAccountField;

  /**
   * Credentials used in the test environment.
   */
  test_credentials: ICarrierAccountField;

  /**
   * For USPS this designates that no credentials are required.
   */
  auto_link: boolean;

  /**
   * When present, a separate authentication process will be required through the UI to link this account type.
   */
  custom_workflow: boolean;
}
