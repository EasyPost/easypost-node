/**
 * Interface for FedEx Account Validation Response returned during initial validation steps.
 */
export declare interface IFedExAccountValidationResponse {
  /**
   * Email address for PIN delivery (if applicable)
   */
  email_address?: string | null;

  /**
   * Available PIN delivery options (SMS, CALL, EMAIL, INVOICE)
   */
  options?: Array<string> | null;

  /**
   * Phone number for PIN delivery (if applicable)
   */
  phone_number?: string | null;

  /**
   * Carrier account ID (returned upon successful validation)
   */
  id?: string | null;

  /**
   * Object type (returned upon successful validation)
   */
  object?: string | null;

  /**
   * Carrier account type (returned upon successful validation)
   */
  type?: string | null;

  /**
   * Carrier account credentials (returned upon successful validation)
   */
  credentials?: Record<string, string> | null;
}

/**
 * Interface for FedEx Request PIN Response.
 */
export declare interface IFedExRequestPinResponse {
  /**
   * Confirmation message that PIN was sent
   */
  message?: string | null;
}

/**
 * The FedEx Registration service provides methods for registering FedEx carrier accounts with multi-factor authentication.
 *
 * @see https://support.easypost.com/hc/en-us/articles/35262738410253-FedEx-Multi-Factor-Authentication
 */
declare class FedExRegistration {
  /**
   * Register the billing address for a FedEx account.
   *
   * @param fedexAccountNumber The FedEx account number.
   * @param params Parameters including address_validation and optional easypost_details.
   * @returns {Promise<IFedExAccountValidationResponse>} Response object with next steps (PIN or invoice validation).
   */
  static registerAddress(
    fedexAccountNumber: string,
    params: {
      address_validation: {
        name?: string;
        street1: string;
        city: string;
        state: string;
        postal_code: string;
        country_code: string;
      };
      easypost_details?: {
        action?: string;
        type?: string;
        carrier_account_id?: string;
      };
    },
  ): Promise<IFedExAccountValidationResponse>;

  /**
   * Request a PIN for FedEx account verification.
   *
   * @param fedexAccountNumber The FedEx account number.
   * @param pinMethodOption The PIN delivery method: "SMS", "CALL", or "EMAIL".
   * @returns {Promise<IFedExRequestPinResponse>} Response object confirming PIN was sent.
   */
  static requestPin(
    fedexAccountNumber: string,
    pinMethodOption: string,
  ): Promise<IFedExRequestPinResponse>;

  /**
   * Validate the PIN entered by the user for FedEx account verification.
   *
   * @param fedexAccountNumber The FedEx account number.
   * @param params Parameters including pin_validation and optional easypost_details.
   * @returns {Promise<IFedExAccountValidationResponse>} Response object with carrier account credentials.
   */
  static validatePin(
    fedexAccountNumber: string,
    params: {
      pin_validation: {
        pin_code: string;
        name?: string;
      };
      easypost_details?: {
        action?: string;
        type?: string;
        carrier_account_id?: string;
      };
    },
  ): Promise<IFedExAccountValidationResponse>;

  /**
   * Submit invoice information to complete FedEx account registration.
   *
   * @param fedexAccountNumber The FedEx account number.
   * @param params Parameters including invoice_validation and optional easypost_details.
   * @returns {Promise<IFedExAccountValidationResponse>} Response object with carrier account credentials.
   */
  static submitInvoice(
    fedexAccountNumber: string,
    params: {
      invoice_validation: {
        name?: string;
        invoice_number: string;
        invoice_date: string;
        invoice_amount: string;
        invoice_currency: string;
      };
      easypost_details?: {
        action?: string;
        type?: string;
        carrier_account_id?: string;
      };
    },
  ): Promise<IFedExAccountValidationResponse>;
}

export type { FedExRegistration };
