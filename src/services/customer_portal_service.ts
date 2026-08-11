import baseService from './base_service';

type CustomerPortalAccountLinkCreateParameters = Record<string, unknown> & {
  session_type?: 'account_onboarding' | 'account_management' | null;
  user_id?: string | null;
  refresh_url?: string | null;
  return_url?: string | null;
  metadata?: Record<string, unknown> | null;
};

export default (easypostClient) =>
  /**
   * The CustomerPortalService class provides methods for interacting with EasyPost {@link Tracker} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomerPortalService extends baseService(easypostClient) {
    /**
     * Create a Portal Session.
     * @param {Object} [params] - The parameters to create a session from.
     * @returns {Object} - An object containing the created session.
     */
    static async createAccountLink(
      params: CustomerPortalAccountLinkCreateParameters = {},
    ): Promise<unknown> {
      const url = 'customer_portal/account_link';

      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
