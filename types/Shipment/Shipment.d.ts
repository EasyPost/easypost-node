import { IAddress } from '../Address';
import { IDatedObject, IObjectWithId } from '../base';
import { TBatchStatus } from '../Batch';
import { ICustomsInfo } from '../Customs';
import { IFee } from '../Fee';
import { IInsurance } from '../Insurance';
import { IParcel } from '../Parcel';
import { IScanForm } from '../ScanForm';
import { ITracker } from '../Tracker';
import { IForm } from './Form';
import { IMessage } from './Message';
import { IOptions, LabelFormat } from './Options';
import { IPostageLabel } from './PostageLabel';
import { IRate } from './Rate';
import { IShipmentCreateParameters } from './ShipmentCreateParameters';
import { IShipmentListParameters } from './ShipmentListParameters';

/**
 * The workhorse of the EasyPost API, a Shipment is made up of a "to" and "from" Address, the Parcel being shipped, and any customs forms required for international deliveries.
 * Once created a Shipment object is used to retrieve shipping Rates and purchase a label.
 *
 * A Shipment created with a valid to_address, from_address, and parcel will automatically populate its rates attribute.
 *
 * @see https://www.easypost.com/docs/api/node#shipment-object
 */
export declare interface IShipment extends IObjectWithId<'Shipment'>, IDatedObject {
  /**
   * An optional field that may be used in place of id in other API endpoints
   */
  reference?: string | null;

  /**
   * The destination address
   */
  to_address: IAddress;

  /**
   * The origin address
   */
  from_address: IAddress;

  /**
   * The shipper's address, defaults to from_address
   */
  return_address?: IAddress | null;

  /**
   * The buyer's address, defaults to to_address
   */
  buyer_address?: IAddress | null;

  /**
   * The dimensions and weight of the package
   */
  parcel: IParcel;

  /**
   * Information for the processing of customs
   */
  customs_info?: ICustomsInfo | null;

  /**
   * Document created to manifest and scan multiple shipments
   */
  scan_form: IScanForm;

  /**
   * All associated Form objects
   */
  forms: IForm[];

  /**
   * The associated Insurance object
   */
  insurance: IInsurance;

  /**
   * All associated Rate objects
   */
  rates: IRate[];

  /**
   * The specific rate purchased for the shipment, or null if unpurchased or purchased through another mechanism
   */
  selected_rate: IRate;

  /**
   * The associated PostageLabel object
   */
  postage_label: IPostageLabel;

  /**
   * Any carrier errors encountered during rating, discussed in more depth below
   */
  messages: IMessage[];

  /**
   * All the options passed to the shipment, discussed in more depth below
   */
  options?: IOptions | null;

  /**
   * Set true to create as a return, discussed in more depth below
   */
  is_return?: boolean | null;

  /**
   * If purchased, the tracking code will appear here as well as within the Tracker object
   */
  tracking_code: string;

  /**
   * The USPS zone of the shipment, if purchased with USPS
   */
  usps_zone: string;

  /**
   * The current tracking status of the shipment
   */
  status: string;

  /**
   * The associated Tracker object
   */
  tracker: ITracker;

  /**
   * The associated Fee objects charged to the billing user account
   */
  fees: IFee[];

  /**
   * The current status of the shipment refund process. Possible values are "submitted", "refunded", "rejected".
   */
  refund_status: 'submitted' | 'refunded' | 'rejected';

  /**
   * The ID of the batch that contains this shipment, if any
   */
  batch_id: string;

  /**
   * The current status of the associated BatchShipment
   */
  batch_status: TBatchStatus;

  /**
   * The current message of the associated BatchShipment
   */
  batch_message: string;

  /**
   * Indicate if the shipment includes a carbon offset fee
   */
  carbon_offset: boolean;
}

export declare class Shipment implements IShipment {
  public constructor(input: IShipmentCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'Shipment';
  reference?: string | null;
  to_address: IAddress;
  from_address: IAddress;
  return_address?: IAddress | null;
  buyer_address?: IAddress | null;
  parcel: IParcel;
  customs_info?: ICustomsInfo | null;
  scan_form: IScanForm;
  forms: IForm[];
  insurance: IInsurance;
  rates: IRate[];
  selected_rate: IRate;
  postage_label: IPostageLabel;
  messages: IMessage[];
  options?: IOptions | null;
  is_return?: boolean | null;
  tracking_code: string;
  usps_zone: string;
  status: string;
  tracker: ITracker;
  fees: IFee[];
  refund_status: 'submitted' | 'refunded' | 'rejected';
  batch_id: string;
  batch_status: TBatchStatus;
  batch_message: string;
  carbon_offset: boolean;
  created_at: string;
  updated_at: string;

  /**
   * A Shipment is almost exclusively a container for other objects, and thus a Shipment may reuse many of these objects.
   * Additionally, all the objects contained within a Shipment may be created at the same time.
   *
   * The origin/destination Address and Parcel are required for rating.
   * CustomsInfo is required to rate an international Shipment, this includes when the destination is a US Territory.
   * The associated Tracker, Fees, and Rates are generated by EasyPost and cannot be modified by the user.
   *
   * You can limit the CarrierAccounts to use for rating by passing the carrier_accounts parameter.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-shipment
   *
   * @param {Object} params The parameters to create an {@link Shipment} with.
   * @param carbonOffset indicate if the shipment should include a carbon offset fee.
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static create(params: Object, carbonOffset?: boolean): Promise<Shipment>;

  /**
   * The Shipment List is a paginated list of all Shipment objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The `has_more` attribute indicates whether additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Shipment shipments} and pagination information.
   */
  static all(
    params?: IShipmentListParameters,
  ): Promise<{ shipments: Shipment[]; has_more: boolean }>;

  /**
   * A Shipment can be retrieved by either its id or reference.
   * However, it is recommended to use EasyPost's provided identifiers because uniqueness on reference is not enforced.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-shipment
   *
   * @param {string} id Unique, begins with "shp_".
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static retrieve(id: string): Promise<Shipment>;

  /**
   * To purchase a Shipment you only need to specify the Rate to purchase.
   * This operation populates the `tracking_code` and `postage_label` attributes.
   * The default image format of the associated PostageLabel is PNG.
   * To change this default see the label_format option.
   *
   * Additionally, insurance may be added during the purchase.
   * To specify an amount to insure, pass the insurance attribute as a string.
   * The currency of all insurance is USD.
   *
   * @see https://www.easypost.com/docs/api/node#buy-a-shipment
   *
   * @param id shipment id (begins with "shp_").
   * @param rate rate id (begins with "rate_") or rate object.
   * @param insuranceAmount amount to insure the shipment for.
   * @param carbonOffset indicate if the shipment should include a carbon offset fee.
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static buy(
    id: string,
    rate: string | IRate,
    insuranceAmount?: number,
    carbonOffset?: boolean,
  ): Promise<Shipment>;

  /**
   * Refunding a Shipment is available for many carriers supported by EasyPost.
   * Once the refund has been submitted, refund_status attribute of the Shipment will be populated with one of the possible values: "submitted", "refunded", "rejected".
   * The most common initial status is "submitted".
   * Many carriers require that the refund be processed before the `refund_status` will move to "refunded".
   * The length of this process depends on the carrier, but no greater than 30 days.
   *
   * Refunds created very shortly after a label is generated may be improperly flagged as invalid, but you may retry a refund with the "rejected" status by submitting the same request again.
   * Carriers that are bill-on-scan tend to have refunds attempts return as "not_applicable", which will not change with multiple retries.
   *
   * @see https://www.easypost.com/docs/api/node#refund-a-shipment
   *
   * @param id shipment id (begins with "shp_").
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static refund(id: string): Promise<Shipment>;

  /**
   *
   * @param carriers a list of carriers to filter rates for.
   * @param services a list of services to filter rates for.
   * @returns {Rate} The lowest {@link Rate}.
   */
  lowestRate(carriers?: string[], services?: string[]): IRate;

  /**
   * A Shipment's PostageLabel can be converted from PNG to other formats.
   * If the PostageLabel was originally generated in a format other than PNG it cannot be converted.
   *
   * @see https://www.easypost.com/docs/api/node#convert-the-label-format-of-a-shipment
   *
   * @param id shipment id (begins with "shp_").
   * @param format Format of the label ("PNG", "PDF", "ZPL", and "EPL2").
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static convertLabelFormat(id: string, format: LabelFormat): Promise<Shipment>;

  /**
   * You can update the Rates of a Shipment at any time.
   * This operation respects the `carrier_accounts` attribute.
   *
   * @see https://www.easypost.com/docs/api/node#regenerate-rates-for-a-shipment
   *
   * @param id shipment id (begins with "shp_").
   * @param carbonOffset indicate if the rates should include a carbon offset fee.
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static regenerateRates(id: string, carbonOffset?: boolean): Promise<Shipment>;

  /**
   * Insuring your Shipment is as simple as sending us the value of the contents.
   * We charge 1% of the value, with a $1 minimum, and handle all the claims.
   * All our claims are paid out within 10 days.
   *
   * To buy insurance, first purchase the Shipment, then make the insurance call before the package begins being handled by the carrier.
   *
   * @see https://www.easypost.com/docs/api/node#insure-a-shipment
   *
   * @param id shipment id (begins with "shp_").
   * @param amount amount to insure the shipment for.
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static insure(id: string, amount: number): Promise<Shipment>;

  /**
   * Generate a specific type of form for the Shipment, using the provided form options.
   *
   * @param id shipment id (begins with "shp_").
   * @param formType The type of form to generate.
   * @param formOptions Additional options to use when generating the form.
   * @returns {Promise<Shipment>} The created {@link Shipment}.
   */
  static generateForm(id: string, formType: string, formOptions?: object): Promise<Shipment>;

  /**
   * Retrieves the estimated delivery date of each Rate via SmartRate.
   *
   * @param id shipment id (begins with "shp_").
   * @param plannedShipDate The planned ship date in format YYYY-MM-DD
   *  @returns {Promise<Array<Object>>} The array of estimated delivery dates and rates.
   */
  static retrieveEstimatedDeliveryDate(id: string, plannedShipDate: string): Promise<Array<Object>>;
}
