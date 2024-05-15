import EasyPost from "../..";
import baseService from "../base_service";
import { IBatch } from "./Batch";
import { IBatchCreateParameters } from "./BatchCreateParameters";
import { IBatchListParameters } from "./BatchListParameters";

export * from "./Batch";
export * from "./BatchCreateParameters";
export * from "./BatchListParameters";
export * from "./BatchShipment";
export * from "./BatchState";
export * from "./BatchStatus";
export * from "./BatchStatuses";

export const DEFAULT_LABEL_FORMAT = "pdf";

export default (easypostClient: EasyPost) =>
  /**
   * The BatchService class provides methods for interacting with EasyPost {@link Batch} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class BatchService extends baseService(easypostClient) {
    /**
     * Create a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-batch EasyPost API Documentation} for more information.
     * @param params - Parameters for the batch to be created.
     * @returns - The created batch.
     */
    static async create(params: IBatchCreateParameters) {
      const url = "batches";

      const wrappedParams = {
        batch: params,
      };

      return this._create<IBatch>(url, wrappedParams);
    }

    /**
     * Add {@link Shipment shipments} to a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#add-shipments-to-a-batch EasyPost API Documentation} for more information.
     * @param id - The id of the batch to add shipments to.
     * @param shipmentIds - The ids of the shipments to add to the batch.
     * @returns - The updated batch.
     */
    static async addShipments(id: string, shipmentIds: string[]) {
      const url = `batches/${id}/add_shipments`;
      const wrappedParams = {
        shipments: shipmentIds.map((s) => ({ id: s })),
      };
      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject<IBatch>(
          response.body,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Removes {@link Shipment shipments} from a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#remove-shipments-from-a-batch EasyPost API Documentation} for more information.
     * @param id - The id of the batch to remove shipments from.
     * @param shipmentIds - The ids of the shipments to remove from the batch.
     * @returns - The updated batch.
     */
    static async removeShipments(id: string, shipmentIds: string[]) {
      const url = `batches/${id}/remove_shipments`;
      const wrappedParams = {
        shipments: shipmentIds.map((s) => ({ id: s })),
      };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject<IBatch>(
          response.body,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Generate a label for a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#batch-labels EasyPost API Documentation} for more information.
     * @param id - The id of the batch to generate a label for.
     * @param fileFormat - The format of the label to generate. Defaults to 'pdf'.
     * @returns - The updated batch.
     */
    static async generateLabel(id: string, fileFormat = DEFAULT_LABEL_FORMAT) {
      const url = `batches/${id}/label`;
      const wrappedParams = { file_format: fileFormat };

      try {
        const response = await easypostClient._post(url, wrappedParams);

        return this._convertToEasyPostObject<IBatch>(
          response.body,
          wrappedParams
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Create a {@link ScanForm scan form} for a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#manifesting-scan-form EasyPost API Documentation} for more information.
     * @param id - The id of the batch to create a scan form for.
     * @returns - The updated batch.
     */
    static async createScanForm(id: string) {
      const url = `batches/${id}/scan_form`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject<IBatch>(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Purchase a {@link Batch batch}.
     * See {@link https://www.easypost.com/docs/api/node#buy-a-batch EasyPost API Documentation} for more information.
     * @param id - The id of the batch to purchase.
     * @returns - The purchased batch.
     */
    static async buy(id: string) {
      const url = `batches/${id}/buy`;

      try {
        const response = await easypostClient._post(url);

        return this._convertToEasyPostObject<IBatch>(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Batch batches} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#list-all-batches EasyPost API Documentation} for more information.
     * @param [params] - Parameters to filter the list of batches.
     * @returns - An object containing a list of {@link Batch batches} and pagination information.
     */
    static async all(params: IBatchListParameters = {}) {
      const url = "batches";

      return this._all<IBatch>(url, params);
    }

    /**
     * Retrieve a {@link Batch batch} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-batch EasyPost API Documentation} for more information.
     * @param id - The ID of the batch to retrieve.
     * @returns - The retrieved batch.
     */
    static async retrieve(id: string) {
      const url = `batches/${id}`;

      return this._retrieve<IBatch>(url);
    }
  };
