import EasyPost from '../..';
import { IBatch } from './Batch';
import { IBatchCreateParameters } from './BatchCreateParameters';
import { IBatchListParameters } from './BatchListParameters';
export * from './Batch';
export * from './BatchCreateParameters';
export * from './BatchListParameters';
export * from './BatchShipment';
export * from './BatchState';
export * from './BatchStatus';
export * from './BatchStatuses';
export declare const DEFAULT_LABEL_FORMAT = 'pdf';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Batch batch}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-batch EasyPost API Documentation} for more information.
   * @param params - Parameters for the batch to be created.
   * @returns - The created batch.
   */
  create(params: IBatchCreateParameters): Promise<import('../base_service').EasyPostObject<IBatch>>;
  /**
   * Add {@link Shipment shipments} to a {@link Batch batch}.
   * See {@link https://www.easypost.com/docs/api/node#add-shipments-to-a-batch EasyPost API Documentation} for more information.
   * @param id - The id of the batch to add shipments to.
   * @param shipmentIds - The ids of the shipments to add to the batch.
   * @returns - The updated batch.
   */
  addShipments(
    id: string,
    shipmentIds: string[],
  ): Promise<import('../base_service').EasyPostObject<IBatch>>;
  /**
   * Removes {@link Shipment shipments} from a {@link Batch batch}.
   * See {@link https://www.easypost.com/docs/api/node#remove-shipments-from-a-batch EasyPost API Documentation} for more information.
   * @param id - The id of the batch to remove shipments from.
   * @param shipmentIds - The ids of the shipments to remove from the batch.
   * @returns - The updated batch.
   */
  removeShipments(
    id: string,
    shipmentIds: string[],
  ): Promise<import('../base_service').EasyPostObject<IBatch>>;
  /**
   * Generate a label for a {@link Batch batch}.
   * See {@link https://www.easypost.com/docs/api/node#batch-labels EasyPost API Documentation} for more information.
   * @param id - The id of the batch to generate a label for.
   * @param fileFormat - The format of the label to generate. Defaults to 'pdf'.
   * @returns - The updated batch.
   */
  generateLabel(
    id: string,
    fileFormat?: string,
  ): Promise<import('../base_service').EasyPostObject<IBatch>>;
  /**
   * Create a {@link ScanForm scan form} for a {@link Batch batch}.
   * See {@link https://www.easypost.com/docs/api/node#manifesting-scan-form EasyPost API Documentation} for more information.
   * @param id - The id of the batch to create a scan form for.
   * @returns - The updated batch.
   */
  createScanForm(id: string): Promise<import('../base_service').EasyPostObject<IBatch>>;
  /**
   * Purchase a {@link Batch batch}.
   * See {@link https://www.easypost.com/docs/api/node#buy-a-batch EasyPost API Documentation} for more information.
   * @param id - The id of the batch to purchase.
   * @returns - The purchased batch.
   */
  buy(id: string): Promise<import('../base_service').EasyPostObject<IBatch>>;
  /**
   * Retrieve all {@link Batch batches} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#list-all-batches EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the list of batches.
   * @returns - An object containing a list of {@link Batch batches} and pagination information.
   */
  all(params?: IBatchListParameters): Promise<
    import('../../utils/types').IBaseObject<'Batch'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Batch';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        state: import('./BatchState').TBatchState;
        num_shipments: number;
        shipments: import('./BatchShipment').IBatchShipment[];
        status: import('./BatchStatuses').TBatchStatuses;
        label_url?: string | null | undefined;
        scan_form: import('..').IScanForm;
        pickup: import('../pickup_service/Pickup').IPickup;
      } & {
        _params: any;
      } & {
        has_more: boolean;
      }
  >;
  /**
   * Retrieve a {@link Batch batch} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-batch EasyPost API Documentation} for more information.
   * @param id - The ID of the batch to retrieve.
   * @returns - The retrieved batch.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IBatch>>;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>;
  _create<A_1>(url: string, params: object): Promise<import('../base_service').EasyPostObject<A_1>>;
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
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>;
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
