import EasyPostClient from "../easypost";
import EndOfPaginationError from "../errors/general/end_of_pagination_error";

export type EasyPostObject<A> = A & {
  _params: any;
};

export default (easypostClient: EasyPostClient) =>
  /**
   * The base class for all EasyPost client library services.
   * @param {EasyPostClient} easypostClient The {@link EasyPostClient} instance to use for API calls.
   */
  class BaseService {
    /**
     * Converts a JSON response and all its nested elements to associated {@link EasyPostObject}-based class instances.
     * @internal
     * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
     * @param {*} params The parameters passed when fetching the response
     * @returns {*} An {@link EasyPostObject}-based class instance or an `Array` of {@link EasyPostObject}-based class instances.
     */
    static _convertToEasyPostObject<A extends any>(
      response: A,
      params?: any
    ): EasyPostObject<A> {
      const newResponse = response as EasyPostObject<A>;
      newResponse._params = params;

      return newResponse;
    }

    /**
     * Creates an EasyPost Object via the API.
     * @internal
     * @param url The URL to send the API request to.
     * @param params The parameters to send with the API request.
     * @returns The created {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async _create<A>(
      url: string,
      params: object
    ): Promise<EasyPostObject<A>> {
      try {
        const response = await easypostClient._post(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of records from the API.
     * @internal
     * @param url The URL to send the API request to.
     * @param params The parameters to send with the API request.
     * @returns The retrieved {@link EasyPostObject}-based class instance(s), or a `Promise` that rejects with an error.
     */
    static async _all<A>(
      url: string,
      params: Record<string, string | number | boolean> = {}
    ): Promise<EasyPostObject<A> & { has_more: boolean }> {
      try {
        // eslint-disable-next-line no-param-reassign
        const response = await easypostClient._get(url, params);

        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a record from the API.
     * @internal
     * @param url The URL to send the API request to.
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async _retrieve<A>(url: string): Promise<EasyPostObject<A>> {
      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the next page of specific collection of object
     * @internal
     * @param url The URL to send the API request to.
     * @param collection The collection of a specific object.
     * @param pageSize The number of records to return on each page.
     * @param optionalParams The optional param for additional value in the query string.
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     * TODO: Implement this function in EndShippers and Batches once the API supports them properly.
     */
    static async _getNextPage<A extends Record<string, any>>(
      url: string,
      key: keyof A,
      collection: A,
      pageSize: number | null = null,
      optionalParams: Record<string, string> = {}
    ): Promise<EasyPostObject<A> & { has_more: boolean }> {
      const collectionArray = collection[key];
      if (
        collectionArray == undefined ||
        collectionArray.length == 0 ||
        !collection.has_more
      ) {
        throw new EndOfPaginationError();
      }

      const defaultParams =
        collection._params ?? collectionArray[0]._params ?? {};

      const params = {
        ...defaultParams,
        page_size: defaultParams.page_size ?? pageSize,
        before_id: collectionArray[collectionArray.length - 1].id,
        ...optionalParams,
      };

      const response = await this._all<A>(url, params);
      if (response == undefined || response[key].length == 0) {
        throw new EndOfPaginationError();
      }

      return response;
    }
  };
