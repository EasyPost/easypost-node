import baseService from './base_service';
import CustomsInfo from '../models/customs_info';

type CustomsItemInput = Record<string, unknown>;

type CustomsInfoCreateParameters = Record<string, unknown> & {
  eel_pfc?: string | null;
  contents_type?: string | null;
  contents_explanation?: string | null;
  customs_certify?: boolean | null;
  customs_signer?: string | null;
  non_delivery_option?: 'abandon' | 'return' | null;
  restriction_type?: 'none' | 'other' | 'quarantine' | 'sanitary_phytosanitary_inspection' | null;
  restriction_comments?: string | null;
  customs_items?: CustomsItemInput[] | null;
  declaration?: string | null;
};

export default (easypostClient: any) =>
  /**
   * The CustomsInfoService class provides methods for interacting with EasyPost {@link CustomsInfo} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomsInfoService extends baseService(easypostClient) {
    /**
     * Create a {@link CustomsInfo customs info} record.
     * See {@link https://docs.easypost.com/docs/customs-infos#create-a-customsinfo EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the customs info to be created.
     * @returns {CustomsInfo} - The created customs info.
     */
    static async create(params: CustomsInfoCreateParameters): Promise<CustomsInfo> {
      const url = 'customs_infos';

      const wrappedParams = {
        customs_info: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve a {@link CustomsInfo customs info} record by its ID.
     * See {@link https://docs.easypost.com/docs/customs-infos#retrieve-a-customsinfo EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the customs info to retrieve.
     * @returns {CustomsInfo} - The retrieved customs info.
     */
    static async retrieve(id: string): Promise<CustomsInfo> {
      const url = `customs_infos/${id}`;

      return this._retrieve(url);
    }
  };
