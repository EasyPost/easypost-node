import { IDatedObject, IObjectWithId } from '../base';
import { IRefundCreateParameters } from './RefundCreateParameters';
import { IRefundListParameters } from './RefundListParameters';

/**
 * The Refund object represents a refunded shipment, and includes details about the related Shipment and tracking code.
 * USPS shipping labels can be refunded if requested within 30 days of generation.
 * The processing time is at least 15 days, after which the funds will return to your EasyPost balance.
 * EasyPost fees will also be refunded. To qualify, a shipment must not have been scanned by the USPS.
 * UPS and FedEx shipping labels may be refunded within 90 days of creation.
 */
export declare interface IRefund extends IObjectWithId<'Refund'>, IDatedObject {
  /**
   * The tracking code of the related Shipment
   */
  tracking_code: string;

  /**
   * The confirmation number for the refund request to the carrier
   */
  confirmation_number: string;

  /**
   * The status of the refund request, reported by the carrier. Possible values are "submitted", "refunded", or "rejected"
   */
  status: 'submitted' | 'refunded' | 'rejected';

  /**
   * The carrier the refund request was submitted to
   */
  carrier: string;

  /**
   * The ID of the related Shipment being refunded
   */
  shipment_id: string;
}

export declare class Refund implements IRefund {
  public constructor(input: IRefundCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'Refund';
  tracking_code: string;
  confirmation_number: string;
  status: 'submitted' | 'refunded' | 'rejected';
  carrier: string;
  shipment_id: string;
  created_at: string;
  updated_at: string;

  /**
   * This endpoint is intended to be used to bulk-process multiple refunds; as a result, this endpoint will return a list of Refund objects.
   * To refund a single shipment, use the Refund a Shipment endpoint instead.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-refund
   *
   * @param {Object} params The parameters to create an {@link Refund} with.
   * @returns {Promise<Refund>} The created and verified {@link Refund}.
   */
  static create(params: Object): Promise<Refund>;

  /**
   * Retrieve a paginated list of all Refunds associated with the given API Key.
   * See the Pagination section of our docs for more details on retrieving all records when multiple pages are available.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-refunds
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Refund refunds} and pagination information.
   */
  static all(params?: IRefundListParameters): Promise<{ refunds: Refund[]; has_more: boolean }>;

  /**
   * Retrieve a Refund by id.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-refund
   *
   * @param refundId Unique, starts with "refund_"
   * @returns {Promise<Refund>} The created and verified {@link Refund}.
   */
  static retrieve(refundId: string): Promise<Refund>;
}
