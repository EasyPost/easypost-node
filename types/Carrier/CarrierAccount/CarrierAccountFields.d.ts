import { ICarrierAccountField } from './CarrierAccountField';

/**
 * @see https://docs.easypost.com/docs/carrier-accounts#fields-object
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
