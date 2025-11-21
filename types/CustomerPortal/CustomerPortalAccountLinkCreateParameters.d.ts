export declare interface ICustomerPortalAccountLinkCreateParameters {
  /** Type of Customer Portal session. */
  session_type: 'account_onboarding' | 'account_management';

  /** The User ID of the sub account for which the portal session is being created. */
  user_id: string;

  /** The URL to which the sub account will be redirected if the session URL is expired, reused, or otherwise invalid. This should trigger a new session request. */
  refresh_url: string;

  /**
   * The URL to which the sub account will be redirected after exiting the Customer Portal session.
   * This does not confirm completion of the flow; webhook or API polling is recommended for confirmation.
   */
  return_url: string;

  /**
   * Used to configure the Customer Portal session.
   */
  metadata?: object;
}
