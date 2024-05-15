import EasyPostClient from '../easypost';
export type EasyPostObject<A> = A & {
  _params: any;
};
declare const _default: (easypostClient: EasyPostClient) => {
  new (): {};
  /**
   * Converts a JSON response and all its nested elements to associated {@link EasyPostObject}-based class instances.
   * @internal
   * @param {*} response The JSON response to convert (usually a `Map` or `Array`).
   * @param {*} params The parameters passed when fetching the response
   * @returns {*} An {@link EasyPostObject}-based class instance or an `Array` of {@link EasyPostObject}-based class instances.
   */
  _convertToEasyPostObject<A extends unknown>(response: A, params?: any): EasyPostObject<A>;
  /**
   * Creates an EasyPost Object via the API.
   * @internal
   * @param url The URL to send the API request to.
   * @param params The parameters to send with the API request.
   * @returns The created {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  _create<A_1>(url: string, params: object): Promise<EasyPostObject<A_1>>;
  /**
   * Retrieve a list of records from the API.
   * @internal
   * @param url The URL to send the API request to.
   * @param params The parameters to send with the API request.
   * @returns The retrieved {@link EasyPostObject}-based class instance(s), or a `Promise` that rejects with an error.
   */
  _all<A_2>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<
    A_2 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a record from the API.
   * @internal
   * @param url The URL to send the API request to.
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  _retrieve<A_3>(url: string): Promise<EasyPostObject<A_3>>;
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
  _getNextPage<A_4 extends Record<string, any>>(
    url: string,
    key: keyof A_4,
    collection: A_4,
    pageSize?: number | null,
    optionalParams?: Record<string, string>,
  ): Promise<
    A_4 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
};
export default _default;
