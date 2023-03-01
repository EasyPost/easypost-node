import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CustomsInfoService class provides methods for interacting with EasyPost {@link CustomsInfo} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomsInfoService extends baseService(easypostClient) {
    /**
     * Create a {@link CustomsInfo customs info} record.
     * See {@link https://www.easypost.com/docs/api/node#create-a-customsinfo EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the customs info to be created.
     * @returns {CustomsInfo} - The created customs info.
     */
    static async create(params) {
      const url = 'customs_infos';

      const wrappedParams = {
        customs_info: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a {@link CustomsInfo customs info} record by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-customsinfo EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the customs info to retrieve.
     * @returns {CustomsInfo} - The retrieved customs info.
     */
    static async retrieve(id) {
      const url = `customs_infos/${id}`;

      return this._retrieve(url);
    }
  };
