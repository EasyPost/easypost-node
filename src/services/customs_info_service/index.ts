import EasyPost from "../..";
import baseService from "../base_service";
import { ICustomsInfo } from "./CustomsInfo";
import { ICustomsInfoCreateParameters } from "./CustomsInfoCreateParameters";

export * from "./CustomsInfo";
export * from "./CustomsInfoCreateParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The CustomsInfoService class provides methods for interacting with EasyPost {@link CustomsInfo} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CustomsInfoService extends baseService(easypostClient) {
    /**
     * Create a {@link CustomsInfo customs info} record.
     * See {@link https://www.easypost.com/docs/api/node#create-a-customsinfo EasyPost API Documentation} for more information.
     * @param params - Parameters for the customs info to be created.
     * @returns - The created customs info.
     */
    static async create(params: ICustomsInfoCreateParameters) {
      const url = "customs_infos";

      const wrappedParams = {
        customs_info: params,
      };

      return this._create<ICustomsInfo>(url, wrappedParams);
    }

    /**
     * Retrieve a {@link CustomsInfo customs info} record by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-customsinfo EasyPost API Documentation} for more information.
     * @param id - The ID of the customs info to retrieve.
     * @returns - The retrieved customs info.
     */
    static async retrieve(id: string) {
      const url = `customs_infos/${id}`;

      return this._retrieve<ICustomsInfo>(url);
    }
  };
