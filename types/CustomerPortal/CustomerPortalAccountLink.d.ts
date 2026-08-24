import { ICustomerPortalAccountLinkCreateParameters } from './CustomerPortalAccountLinkCreateParameters';

/**
 * Class representing an EasyPost CustomerPortalAccountLink object.
 *
 */
export declare interface ICustomerPortalAccountLink {
  /** Always returns "CustomerPortalAccountLink". */
  object: string;

  /** One-time-use session URL for initiating the Customer Portal. */
  link: string;

  /** One-time-use session URL for initiating the Customer Portal. */
  created_at: string;

  /** ISO 8601 timestamp when the link will expire (5 minutes from creation). */
  expires_at: string;
}

declare class CustomerPortalAccountLink implements ICustomerPortalAccountLink {
  public constructor(input: ICustomerPortalAccountLinkCreateParameters);

  object: 'CustomerPortalAccountLink';
  link: string;
  created_at: string;
  expires_at: string;

  /**
   * Create a Portal Session.
   *
   * @see https://docs.easypost.com/docs/customer-portals#creating-a-portal-session
   *
   * @param {Object} params The parameters to create a {@link CustomerPortalAccountLink} with.
   * @returns {Promise<CustomerPortalAccountLink>} The {@link CustomerPortalAccountLink}.
   */
  static createAccountLink(params: Object): Promise<CustomerPortalAccountLink>;
}

export type { CustomerPortalAccountLink };
