import EasyPost from "../..";
import { IAllMethodParameters } from "../../utils/types";
import baseService from "../base_service";
import { IInsurance } from "./Insurance";
import { IInsuranceCreateParameters } from "./InsuranceCreateParameters";

export * from "./Fee";
export * from "./FeeType";
export * from "./Insurance";
export * from "./InsuranceCreateParameters";
export * from "./InsuranceStatus";

export default (easypostClient: EasyPost) =>
  /**
   * The InsuranceService class provides methods for interacting with EasyPost {@link Insurance} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class InsuranceService extends baseService(easypostClient) {
    /**
     * Create an {@link Insurance insurance} record.
     * See {@link https://www.easypost.com/docs/api/node#create-an-insurance EasyPost API Documentation} for more information.
     * @param params - Parameters for the insurance to be created.
     * @returns - The created insurance.
     */
    static async create(params: IInsuranceCreateParameters) {
      const url = "insurances";

      const wrappedParams = {
        insurance: params,
      };

      return this._create<IInsurance>(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Insurance} records associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-insurances EasyPost API Documentation} for more information.
     * @param [params] - Parameters to filter the insurance records.
     * @returns - An object containing the list of {@link Insurance insurance} records and pagination information.
     */
    static async all(params: IAllMethodParameters = {}) {
      const url = "insurances";

      return this._all<IInsurance[]>(url, params);
    }

    /**
     * Retrieve the next page of Insurance collection.
     * @param {Object} insurances An object containing a list of {@link Insurance insurances} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(insurances: any, pageSize: number | null = null) {
      const url = "insurances";
      return this._getNextPage<{ insurances: IInsurance[] }>(
        url,
        "insurances",
        insurances,
        pageSize
      );
    }

    /**
     * Retrieve an {@link Insurance insurance} record by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-insurance EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the insurance to retrieve.
     * @returns {Insurance} - The retrieved insurance.
     */
    static async retrieve(id: string) {
      const url = `insurances/${id}`;

      return this._retrieve<IInsurance>(url);
    }
  };
