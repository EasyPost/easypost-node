import baseService from './base_service';

type RefundCreateParameters = Record<string, unknown> & {
  carrier?: string | null;
  tracking_codes?: string[] | null;
};
type RefundCollection = Record<string, unknown>;

export default (easypostClient) =>
  /**
   * The RefundService class provides methods for interacting with EasyPost {@link Refund} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class RefundService extends baseService(easypostClient) {
    /**
     * Create a {@link Refund refund}.
     * See {@link https://docs.easypost.com/docs/refunds#create-a-refund EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a refund with.
     * @returns {Refund} - The created refund.
     */
    static async create(params: RefundCreateParameters): Promise<unknown> {
      const url = 'refunds';

      const wrappedParams = {
        refund: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Retrieve all {@link Refund refunds} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/refunds#retrieve-all-refunds EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the refunds by.
     * @returns {Object} - An object containing the list of {@link Refund refunds} and pagination information.
     */
    static async all(params: Record<string, unknown> = {}): Promise<unknown> {
      const url = 'refunds';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Refund collection.
     * @param {Object} refunds An object containing a list of {@link Refund refunds} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      refunds: RefundCollection,
      pageSize: number | null = null,
    ): Promise<unknown> {
      const url = 'refunds';
      return this._getNextPage(url, 'refunds', refunds, pageSize);
    }

    /**
     * Retrieve a {@link Refund refund} by its ID.
     * See {@link https://docs.easypost.com/docs/refunds#retrieve-a-refund EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the refund to retrieve.
     * @returns {Refund} - The retrieved refund.
     */
    static async retrieve(id: string): Promise<unknown> {
      const url = `refunds/${id}`;

      return this._retrieve(url);
    }
  };
