import EasyPost from "../..";
import baseService from "../base_service";
import { IScanForm } from "./ScanForm";
import { IScanFormCreateParameters } from "./ScanFormCreateParameters";
import { IScanFormListParameters } from "./ScanFormListParameters";

export * from "./ScanForm";
export * from "./ScanFormCreateParameters";
export * from "./ScanFormListParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The ScanFormService class provides methods for interacting with EasyPost {@link ScanForm} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ScanFormService extends baseService(easypostClient) {
    /**
     * Create a {@link ScanForm scan form}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-scanform EasyPost API Documentation} for more information.
     * @param params - The parameters to create a scan form with.
     * @returns - The created scan form.
     */
    static async create(params: IScanFormCreateParameters) {
      const url = "scan_forms";

      // wraps up params in `shipments` if the user didn't do it
      // turn a list of shipment objects into a map of shipment ids
      if (params.shipments) {
        // eslint-disable-next-line no-param-reassign
        params.shipments = params.shipments.map((s) => {
          if (typeof s === "string") {
            return { id: s };
          }
          return { id: s.id };
        });
      }

      const wrappedParams = {
        scan_form: params,
      };

      return this._create<IScanForm>(url, wrappedParams);
    }

    /**
     * Retrieve all {@link ScanForm scan forms} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-scanforms EasyPost API Documentation} for more information.
     * @param [params] - The parameters to filter the scan forms by.
     * @returns - An object containing the list of {@link ScanForm scan forms} and pagination information.
     */
    static async all(params: IScanFormListParameters = {}) {
      const url = "scan_forms";

      return this._all<{ scan_forms: IScanForm[] }>(url, params);
    }

    /**
     * Retrieve the next page of ScanForm collection.
     * @param scanForms An object containing a list of {@link ScanForm scanForms} and pagination information.
     * @param pageSize The number of records to return on each page
     * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      scanForms: { scan_forms: any[] },
      pageSize: number | null = null
    ) {
      const url = "scan_forms";
      return this._getNextPage<{ scan_forms: IScanForm[] }>(
        url,
        "scan_forms",
        scanForms,
        pageSize
      );
    }

    /**
     * Retrieve a {@link ScanForm scan form} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-scanform EasyPost API Documentation} for more information.
     * @param id - The ID of the scan form to retrieve.
     * @returns - The retrieved scan form.
     */
    static async retrieve(id: string) {
      const url = `scan_forms/${id}`;

      return this._retrieve<IScanForm>(url);
    }
  };
