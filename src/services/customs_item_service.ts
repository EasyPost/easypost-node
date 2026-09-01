import baseService from './base_service';
import CustomsItem from '../models/customs_item';

type CustomsItemCreateParameters = Record<string, unknown> & {
  description?: string | null;
  quantity?: number | null;
  value?: number | null;
  weight?: number | null;
  hs_tariff_number?: string | null;
  code?: string | null;
  origin_country?: string | null;
  currency?: string | null;
};

export default (easypostClient) =>
  /**
   * The CustomsItemService class provides methods for interacting with EasyPost {@link CustomsItem} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomsItemService extends baseService(easypostClient) {
    /**
     * Create a {@link CustomsItem customs item}.
     * See {@link https://docs.easypost.com/docs/customs-items#create-a-customsitem EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the customs item to be created.
     * @returns {CustomsItem} - The created customs item.
     */
    static async create(params: CustomsItemCreateParameters): Promise<CustomsItem> {
      const url = 'customs_items';

      const wrappedParams = {
        customs_item: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a {@link CustomsItem customs item} by its ID.
     * See {@link https://docs.easypost.com/docs/customs-items#retrieve-a-customsitem EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the customs item to retrieve.
     * @returns {CustomsItem} - The retrieved customs item.
     */
    static async retrieve(id: string): Promise<CustomsItem> {
      const url = `customs_items/${id}`;

      return this._retrieve(url);
    }
  };
