import EasyPost from "../..";
import baseService from "../base_service";
import { IAddress } from "./Address";
import { IAddressCreateParameters } from "./AddressCreateParameters";
import { IAddressListParameters } from "./AddressListParameters";

export * from "./Address";
export * from "./AddressCreateParameters";
export * from "./Verification";
export * from "./VerificationDetails";
export * from "./Verifications";

export default (easypostClient: EasyPost) =>
  /**
   * The AddressService class provides methods for interacting with EasyPost {@link Address} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class AddressService extends baseService(easypostClient) {
    /**
     * Create an {@link Address address}.
     * See {@link https://www.easypost.com/docs/api/node#create-an-address EasyPost API Documentation} for more information.
     * @param params - Parameters for the address to be created.
     * @returns - The created address.
     */
    static async create(params: IAddressCreateParameters) {
      const url = "addresses";

      const wrappedParams: { address: IAddressCreateParameters } & Pick<
        IAddressCreateParameters,
        "verify" | "verify_strict"
      > = {
        address: params,
      };

      if (params.verify) {
        wrappedParams.verify = params.verify;
        delete params.verify;
      }

      if (params.verify_strict) {
        wrappedParams.verify_strict = params.verify_strict;
        delete params.verify_strict;
      }

      return this._create<IAddress>(url, wrappedParams);
    }

    /**
     * Create and verify an {@link Address address} in a single request.
     * See {@link https://www.easypost.com/docs/api/node#create-and-verify-addresses EasyPost API Documentation} for more information.
     * @param params - Parameters for the address to be created.
     * @returns - The created and verified address.
     */
    static async createAndVerify(params: IAddressCreateParameters) {
      const url = `addresses/create_and_verify`;
      const wrappedParams = { address: params };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject(
          response.body.address,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Address addresses} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-addresses EasyPost API Documentation} for more information.
     * @param params - Parameters to filter the list of addresses.
     * @returns - An object containing a list of {@link Address addresses} and pagination information.
     */
    static async all(params: IAddressListParameters = {}) {
      const url = "addresses";

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Address collection.
     * @param addresses An object containing a list of {@link Address addresses} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      addresses: { addresses: IAddress[] },
      pageSize: number | null = null
    ) {
      const url = "addresses";
      return this._getNextPage(url, "addresses", addresses, pageSize);
    }

    /**
     * Retrieve an {@link Address address} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-an-address EasyPost API Documentation} for more information.
     * @param id - The ID of the address to retrieve.
     * @returns - The retrieved address.
     */
    static async retrieve(id: string) {
      const url = `addresses/${id}`;

      return this._retrieve<IAddress>(url);
    }

    /**
     * Verify an {@link Address address} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#create-and-verify-addresses EasyPost API Documentation} for more information.
     * @param id - The ID of the address to verify.
     * @returns - The verified address.
     */
    static async verifyAddress(id: string) {
      try {
        const url = `addresses/${id}/verify`;
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject<IAddress>(response.body.address);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
