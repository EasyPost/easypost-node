import EasyPost from "../..";
import baseService from "../base_service";
import { IRefund } from "./Refund";
import { IRefundCreateParameters } from "./RefundCreateParameters";
import { IRefundListParameters } from "./RefundListParameters";

export * from "./Refund";
export * from "./RefundCreateParameters";
export * from "./RefundListParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The RefundService class provides methods for interacting with EasyPost {@link Refund} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RefundService extends baseService(easypostClient) {
    /**
     * Create a {@link Refund refund}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-refund EasyPost API Documentation} for more information.
     * @param params - The parameters to create a refund with.
     * @returns - The created refund.
     */
    static async create(params: IRefundCreateParameters) {
      const url = "refunds";

      const wrappedParams = {
        refund: params,
      };

      return this._create<IRefund>(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Refund refunds} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-refunds EasyPost API Documentation} for more information.
     * @param [params] - The parameters to filter the refunds by.
     * @returns - An object containing the list of {@link Refund refunds} and pagination information.
     */
    static async all(params: IRefundListParameters = {}) {
      const url = "refunds";

      return this._all<{ refunds: IRefund[] }>(url, params);
    }

    /**
     * Retrieve the next page of Refund collection.
     * @param refunds An object containing a list of {@link Refund refunds} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(refunds: any, pageSize: number | null = null) {
      const url = "refunds";
      return this._getNextPage<{ refunds: IRefund[] }>(
        url,
        "refunds",
        refunds,
        pageSize
      );
    }

    /**
     * Retrieve a {@link Refund refund} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-refund EasyPost API Documentation} for more information.
     * @param id - The ID of the refund to retrieve.
     * @returns - The retrieved refund.
     */
    static async retrieve(id: string) {
      const url = `refunds/${id}`;

      return this._retrieve<IRefund>(url);
    }
  };
