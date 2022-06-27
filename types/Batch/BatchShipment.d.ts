import { TBatchStatus } from './BatchStatus';

/**
 * @see https://www.easypost.com/docs/api/node#batch-shipment-object
 */
export declare interface IBatchShipment {
  /**
   * The id of the Shipment. Unique, begins with "shp_"
   */
  id: string;

  /**
   * An optional field that may be used in place of ID in some API endpoints
   */
  reference?: string | null;

  /**
   * The current status. Possible values are "postage_purchased", "postage_purchase_failed", "queued_for_purchase", "creation_failed", and "created"
   */
  batch_status: TBatchStatus;

  /**
   * A human readable message for any errors that occurred during the Batch's life cycle
   */
  batch_message: string;
}
