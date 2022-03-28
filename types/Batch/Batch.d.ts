import { IDatedObject, IObjectWithId } from '../base';
import { IPickup } from '../Pickup';
import { IScanForm } from '../ScanForm';
import { LabelFormat } from '../Shipment';
import { IBatchCreateParameters } from './BatchCreateParameters';
import { IBatchShipment } from './BatchShipment';
import { TBatchState } from './BatchState';
import { TBatchStatuses } from './BatchStatuses';

/**
 * The Batch object allows you to perform operations on multiple Shipments at once.
 * This includes scheduling a Pickup, creating a ScanForm and consolidating labels.
 * Operations performed on Batches are asynchronous and take advantage of our webhook infrastructure.
 *
 * @see https://www.easypost.com/docs/api/node#batch-object
 */
export declare interface IBatch extends IObjectWithId<'Batch'>, IDatedObject {
  /**
   * An optional field that may be used in place of ID in some API endpoints
   */
  reference?: string;

  /**
   * The overall state. Possible values are "creating", "creation_failed", "created", "purchasing", "purchase_failed", "purchased", "label_generating", and "label_generated"
   */
  state: TBatchState;

  /**
   * The number of shipments added
   */
  num_shipments: number;

  shipments: IBatchShipment[];

  /**
   * A map of BatchShipment statuses to the count of BatchShipments with that status. Valid statuses are "postage_purchased", "postage_purchase_failed", "queued_for_purchase", and "creation_failed"
   */
  status: TBatchStatuses;

  /**
   * The label image url
   */
  label_url: string;

  /**
   * The created ScanForm
   */
  scan_form: IScanForm;

  /**
   * The created Pickup
   */
  pickup: IPickup;
}

export declare class Batch implements IBatch {
  public constructor(input: IBatchCreateParameters);

  reference?: string;
  state: TBatchState;
  num_shipments: number;
  shipments: IBatchShipment[];
  status: TBatchStatuses;
  label_url: string;
  scan_form: IScanForm;
  pickup: IPickup;
  id: string;
  mode: 'test' | 'production';
  object: 'Batch';
  created_at: string;
  updated_at: string;

  /**
   * A Batch can be created with or without Shipments.
   * When created with Shipments the initial state will be creating.
   * Once the state changes to created a webhook Event will be sent.
   * When created with no Shipments the initial state will be created and webhook will be sent.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-batch
   */
  public save(): Promise<Batch>;

  static retrieve(batchId: string): Promise<Batch>;

  /**
   * Shipments can be added to a Batch throughout its life cycle.
   * Just remember that the state change of a Batch is asynchronous and will fire a webhook Event when the state change is completed.
   *
   * @see https://www.easypost.com/docs/api/node#add-shipments-to-a-batch
   */
  public addShipments(shipments: IBatchCreateParameters['shipments']): Promise<Batch>;

  /**
   * There could be times when a Shipment needs to be removed from the Batch during its life cycle.
   * Removing a Shipment does not remove it from the consolidated label or ScanForm.
   *
   * @see https://www.easypost.com/docs/api/node#remove-shipments-from-a-batch
   */
  public removeShipments(shipments: IBatchCreateParameters['shipments']): Promise<Batch>;

  /**
   * One of the advantages of processing Shipments in batches is the ability to consolidate the PostageLabel into one file.
   * This can only be done once for each batch and all Shipments must have a status of postage_purchased.
   *
   * Available label formats are 'pdf', 'zpl' or 'epl2' format.
   * Like converting a PostageLabel format, if this process will change the format of the labels they must have been created as PNGs.
   *
   * @see https://www.easypost.com/docs/api/node#batch-labels
   */
  public generateLabel(labelFormat: LabelFormat): Promise<Batch>;

  /**
   * See [Scan Form](https://www.easypost.com/docs/api/node#scan-form) rules and [Object Definition](https://www.easypost.com/docs/api/node#scan-form-object).
   *
   * @see https://www.easypost.com/docs/api/node#manifesting-scan-form
   */
  public createScanForm(): Promise<Batch>;
}
