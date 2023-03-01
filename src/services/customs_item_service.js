import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CustomsItemService class provides methods for interacting with EasyPost {@link CustomsItem} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomsItemService extends baseService(easypostClient) {
    /**
     * Create a {@link CustomsItem customs item}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-customsitem EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the customs item to be created.
     * @returns {CustomsItem} - The created customs item.
     */
    static async create(params) {
      const url = 'customs_items';

      const wrappedParams = {
        customs_item: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a {@link CustomsItem customs item} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-customsitem EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the customs item to retrieve.
     * @returns {CustomsItem} - The retrieved customs item.
     */
    static async retrieve(id) {
      const url = `customs_items/${id}`;

      return this._retrieve(url);
    }
  };
