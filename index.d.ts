type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export declare interface IFieldError {
  /**
   * Field of the request that the error describes
   */
  field: string;

  /**
   * Human readable description of the problem
   */
  message: string;
}

export declare interface IDatedObject {
  /**
   * Date ISO String 
   */
  created_at: string;

  /**
   * Date ISO String 
   */
  updated_at: string;
}

export declare interface IBaseObject<ObjectName> {
  object: ObjectName;
}

export declare interface IObjectWithId<ObjectName> extends IBaseObject<ObjectName> {
  /**
   * Unique identifier, begins with "adr_" / "prcl_" / "ins_" / "trk_" / "batch_" / "cstinfo_" / etc
   */
  id: string;

  /**
   * Set based on which api-key you used, either "test" or "production"
   */
  mode: "test" | "production";
}

// TODO there seems to be a lot of duplicate codes listed here https://www.easypost.com/errors-guide
export declare type TErrorCode =
  "INTERNAL_SERVER_ERROR" | "NOT_ACCEPTABLE" | "NOT_FOUND" | "FORBIDDEN" | "PAYMENT_REQUIRED" | "UNAUTHORIZED" |
  "BAD_REQUEST" | "PAYMENT_GATEWAY.ERROR" | "MODE.UNAUTHORIZED" | "MODE.CONFLICT" | "DATE.PARSE.FAILURE" | "PARAMETER.FORBIDDEN" |
  "PARAMETER.REQUIRED" | "ADDRESS.PARAMETERS.INVALID_CHARACTER" | "ADDRESS.PARAMETERS.INVALID" | "ADDRESS.COUNTRY.INVALID" | "ADDRESS.VERIFICATION.NOT_FOUND" | "ADDRESS.VERIFICATION.FAILURE" |
  "ADDRESS.VERIFY.UNAVAILABLE" | "ADDRESS.VERIFICATION.INVALID" | "ADDRESS.VERIFICATION.NOT_FOUND" | "ADDRESS.VERIFY.FAILURE" | "ADDRESS.VERIFY.CARRIER_INVALID" | "ADDRESS.VERIFY.UPSTREAM_UNAVAILABLE" |
  "ADDRESS.VERIFY.ONLY_US" | "ADDRESS.VERIFY.INTL_NOT_ENABLED" | "ADDRESS.VERIFY.MISSING_STREET" | "ADDRESS.VERIFY.MISSING_CITY_STATE_ZIP" |

  // TODO typo "FORAMT" should be "FORMAT". Is the typo just in the docs or in the api error response as well?
  "BATCH.FILE_FORAMT.INVALID" |

  "BATCH.SHIPMENT.TOO_LARGE" | "BATCH.SHIPMENT.MISSING" | "BATCH.SHIPMENTS.REQUIRED" | "BATCH.STATE.CREATING" | "BATCH.STATE.CREATION_FAILED" | "BATCH.STATE.ALREADY_PURCHASED" |
  "BATCH.STATE.NOT_PURCHASED" | "BATCH.PARAMS.INVALID" | "BANK_ACCOUNT.CHARGE.FAILURE" | "BANK_ACCOUNT.VERIFY.FAILURE" | "CARRIER_ACCOUNT.REGISTRATION.FAILED" | "CARRIER_ACCOUNT.PARAMETERS.INVALID" |
  "CARRIER_ACCOUNT.INVALID" | "CARRIER_ACCOUNT.TYPE.EXISTS" | "CARRIER_ACCOUNT.TYPE.UNKNOWN" | "CREDIT_CARD.CHARGE.FAILURE" | "CREDIT_CARD.INVALID" | "CONTAINER.TYPE.INVALID" | "CONTAINER.DIMENSION.REQUIRED" |
  "CONTAINER.NAME.REQUIRED" | "CUSTOMS_INFO.PARAMETERS.INVALID" | "CUSTOMS_ITEM.ORIGIN_COUNTRY.REQUIRED" | "CUSTOMS_ITEM.CURRENCY.ONE_CURRENCY_SUPPORTED" | "CUSTOMS_ITEM.PARAMETERS.INVALID" |
  "DOCUMENT.COMMERCIAL_INVOICE.FAILURE" | "DOCUMENT.CONVERSION.FAILURE" | "EMAIL_VERIFICATION.USED" | "EMAIL_VERIFICATION.NOT_FOUND" | "EMAIL_VERIFICATION.EXPIRED" |
  "IMAGE.CONVERSION.FAILURE" | "IMAGE.WIDTH.INVALID" | "INSURANCE.PARAMETERS.INVALID" | "INSURANCE.CREATE.FAILURE" | "INSURANCE.PURCHASE.NOT_ALLOWED" | "INSURANCE.PURCHASE.FAILED" |
  "INSURANCE.AMOUNT.BELOW_MINIMUM" | "INSURANCE.AMOUNT.REQUIRED" | "INSURANCE.AMOUNT.ABOVE_MAXIMUM" | "ITEM.WEIGHT.REQUIRED" | "ITEM.HEIGHT.REQUIRED" | "ITEM.WIDTH.REQUIRED" |
  "ITEM.LENGTH.REQUIRED" | "ITEM.VALUE.REQUIRED" | "ITEM.NAME.REQUIRED" | "ORDER.SHIPMENTS.REQUIRED" | "ORDER.FROM_ADDRESS.REQUIRED" | "ORDER.TO_ADDRESS.REQUIRED" |
  "ORDER.OPTIONS.INVALID" | "ORDER.PARAMS.REQUIRED" | "ORDER.INVALID" | "ORDER.RATE.UNAVAILABLE" | "ORDER.SERVICE.REQUIRED" | "ORDER.CARRIER.REQUIRED" |
  "ORDER.LABEL_DATE.INVALID" | "ORDER.CARRIER_ACCOUNTS.CONFLICT" | "PARCEL.PREDEFINED_PACKAGE.INVALID" | "PARCEL.PARAMETERS.INVALID" | "PICKUP.MIN_DATETIME.REQUIRED" |
  "PICKUP.MAX_DATETIME.REQUIRED" | "PICKUP.IS_ACCOUNT_ADDRESS.REQUIRED" | "PICKUP.ADDRESS.INVALID" | "PICKUP.ADDRESS.REQUIRED" | "PICKUP.REQUEST.INVALID" | "PICKUP.BATCH.INVALID" |
  "PICKUP.BATCH.REQUIRED" | "PICKUP.SHIPMENT_SERVICE.INVALID" | "PICKUP.BATCH_CARRIER.INCONSISTENT" | "PICKUP.STATUS.INVALID" | "PICKUP.BUY.FAILED" | "PICKUP.BUY.NO_MATCHING_RATES" |
  "PICKUP.SERVICE.REQUIRED" | "PICKUP.CARRIER.REQUIRED" | "PICKUP.SHIPMENT_COUNTRY.INVALID" | "PICKUP.BUY.FORBIDDEN" | "PICKUP.CANCEL.FAILED" | "REFUND.NO_RESPONSE" |
  "REFUND.FAILURE" | "REFUND.TRACKING_CODES.INVALID" | "REFUND.TRACKING_CODE.NOT_FOUND" | "SCAN_FORM.FAILURE" | "SCAN_FORM.BATCH.MULTIPLE_CARRIERS" | "SCAN_FORM.BATCH.NOT_PURCHASED" |
  "SCAN_FORM.SHIPMENTS.INVALID" | "SCAN_FORM.SHIPMENTS.REQUIRED" | "SCAN_FORM.CREATE.CARRIER_NOT_SUPPORTED" | "SCAN_FORM.CREATE.FAILURE" | "SHIPMENT.PURCHASE.FAILURE" |
  "SHIPMENT.OPTIONS.INVALID" | "SHIPMENT.INVALID_PARAMS" | "SHIPMENT.INVALID" | "SHIPMENT.POSTAGE.INVALID_FORMAT" | "SHIPMENT.POSTAGE.FORMAT_UNAVAILABLE" | "SHIPMENT.POSTAGE.REQUIRED" |
  "SHIPMENT.POSTAGE.EXISTS" | "SHIPMENT.POSTAGE.NO_RESPONSE" | "SHIPMENT.POSTAGE.FAILURE" | "SHIPMENT.REFUND.UNAVAILABLE" | "SHIPMENT.REFUND.FAILURE" | "SHIPMENT.CUSTOMS_INFO.DESCRIPTION_REQUIRED" |
  "SHIPMENT.CUSTOMS_INFO.REQUIRED" | "SHIPMENT.RATE.CARRIER_ACCOUNT_INVALID" | "SHIPMENT.CARRIER_ACCOUNTS.CONFLICT" | "SHIPMENT.TRACKING_CODE.INVALID_CARRIER" | "SHIPMENT.INSURANCE.ALREADY_PURCHASED" |
  "SHIPMENT.MISSING_RATE" | "SHIPMENT.MISSING_INFORMATION" | "SHIPMENT.PURCHASE.IN_PROGRESS" | "SHIPMENT.RATES.UNAVAILABLE" | "SHIPMENT.RATE.STAMP_UNAVAILABLE" | "SHIPMENT.RATE.BARCODE_UNAVAILABLE" |
  "SHIPMENT.POSTAGE.ASCII" | "SHIPMENT_REPORT.DATE_RANGE.INVALID" | "SHIPMENT_REPORT.ALREADY_IN_PROGRESS" | "SHIPMENT_REPORT.DATE_RANGE.TOO_LONG" | "TRACKER.RETRIEVE.ERROR" | "TRACKER.RUN.ERROR" |
  "TRACKER.CREATE.ERROR" | "TRACKER.NOT_FOUND" | "TRACKER.INVALID_TEST_CODE" | "TRACKER.NO_CARRIER_ACCOUNT" | "TRACKER.INVALID_PARAMS" | "TRACKER.UNSUPPORTED_CARRIER" | "TRACKER.CARRIER_CODE_MISMATCH" |
  "TRACKER.MULTIPLE_CARRIERS_FOR_CODE" | "TRACKER.NO_CARRIER_FOR_CODE" | "USER.UNAUTHORIZED" | "USER.INVALID" | "USER.PARENT.INVALID" | "USER.CHARGE.NOT_ALLOWED" |
  "WEBHOOK.EVENT.INVALID" | "WEBHOOK.INVALID" | "DHLGM.RATE_TABLE.NOT_FOUND" | "DHLGM.SCAN_FORM.GENERATION_FAILED" | "DHLGM.RETURN.AUTHORIZATION_NUMBER_REQUIRED" | "DHLGM.LABEL.FAILURE" |
  "DHLGM.NO_INTERNATIONAL" | "DHLGM.NO_ALCOHOL" | "DHLGM.GIRTH_MAX" | "DHLGM.LETTER_NOT_SUPPORTED" | "DHLGM.ACCESS_TOKEN.GENERATION_FAILED";


/**
 * In the event of a client or server error, the response will contain the standard 4xx or 5xx respectively, accompanied by a well-formed JSON body describing the issue, e.g., a required field was omitted, a purchase failed, etc.
 * 
 * Each client library will encapsulate these errors and raise an exception, in addition to other exceptional cases, such as network failures. 
 * It is recommended to handle exceptions gracefully and to report any issues to support@easypost.com.
 * 
 * @see https://www.easypost.com/docs/api/node#error-object
 */
export declare interface IError {
  /**
   * Machine readable description of the problem
   */
  code: TErrorCode;

  /**
   * Human readable description of the problem
   */
  message: string;

  /**
   * Breakdown of errors for specific fields in the request
   */
  errors: IFieldError[];
}

/**
 * @see https://www.easypost.com/docs/api/node#verification-object
 */
export declare interface IVerification {
  /**
   * The success of the verification
   */
  success: boolean;

  /**
   * All errors that caused the verification to fail
   */
  errors: IFieldError[];

  /**
   * Extra data related to the verification
   */
  details: IVerificationDetails;
}

/**
 * @see https://www.easypost.com/docs/api/node#verification_details-object
 */
export declare interface IVerificationDetails {
  latitude: number;
  longitude: number;

  /**
   * The time zone the address is located in, IE: America/Los_Angeles
   */
  time_zone: string;
}

/**
 * @see https://www.easypost.com/docs/api/node#verifications-object
 */
export declare interface IVerifications {
  /**
   * Only applicable to US addresses - checks and sets the ZIP+4
   */
  zip4: IVerification;
  /**
   * Checks that the address is deliverable and makes minor corrections to spelling/format. US addresses will also have their "residential" status checked and set.
   */
  delivery: IVerification;
}

/**
 * Address objects are used to represent people, places, and organizations in a number of contexts. 
 * For example, a Shipment requires a to_address and from_address to accurately calculate rates and generate postage.
 * 
 * Additionally, EasyPost offers several verification tools that can be used to detect deliverability issues, correct minor errors in spelling/formatting, and determine if an Address is residential or not (which has a significant effect on Shipment rating for many carriers).
 * 
 * @see https://www.easypost.com/docs/api/node#address-object
 */
export declare interface IAddress extends IObjectWithId<"Address"> {
  /**
   * First line of the address
   */
  street1: string;

  /**
   * Second line of the address
   */
  street2: string;

  /**
   * City the address is located in
   */
  city: string;

  /**
   * State or province the address is located in
   */
  state: string;

  /**
   * ZIP or postal code the address is located in
   */
  zip: string;

  /**
   * ISO 3166 country code for the country the address is located in
   */
  country: string;

  /**
   * Whether or not this address would be considered residential
   */
  residential: boolean;

  /**
   * The specific designation for the address (only relevant if the address is a carrier facility)
   */
  carrier_facility: string;

  /**
   * Name of the person. Both name and company can be included
   */
  name: string;

  /**
   * Name of the organization. Both name and company can be included
   */
  company: string;

  /**
   * Phone number to reach the person or organization
   */
  phone: string;

  /**
   * Email to reach the person or organization
   */
  email: string;

  /**
   * Federal tax identifier of the person or organization
   */
  federal_tax_id: string;

  /**
   * State tax identifier of the person or organization
   */
  state_tax_id: string;

  /**
   * The result of any verifications requested
   */
  verifications: IVerifications;
}

export declare type TPredefinedPackage = "Card"
  | "Letter"
  | "Flat"
  | "FlatRateEnvelope"
  | "FlatRateLegalEnvelope"
  | "FlatRatePaddedEnvelope"
  | "FlatRateGiftCardEnvelope"
  | "FlatRateWindowEnvelope"
  | "FlatRateCardboardEnvelope"
  | "SmallFlatRateEnvelope"
  | "Parcel"
  | "LargeParcel"
  | "IrregularParcel"
  | "SoftPack"
  | "SmallFlatRateBox"
  | "MediumFlatRateBox"
  | "LargeFlatRateBox"
  | "LargeFlatRateBoxAPOFPO"
  | "LargeFlatRateBoardGameBox"
  | "RegionalRateBoxA"
  | "RegionalRateBoxB"
  | "FlatTubTrayBox"
  | "EMMTrayBox"
  | "FullTrayBox"
  | "HalfTrayBox"
  | "PMODSack";

/**
 * Parcel objects represent the physical container being shipped. 
 * Dimensions can be supplied either as length, width, and height dimensions, or a predefined_package string. 
 * Only weight is required, but since many carriers charge different rates for packages with large dimensions, we strongly recommend including all dimensions if available.
 * 
 * Weights are in OUNCES (OZ) and go to one decimal point.
 * Dimensions are in INCHES (IN) and go to one decimal point.
 * 
 * @see https://www.easypost.com/docs/api/node#parcel-object
 */
export declare interface IParcel extends IObjectWithId<"Parcel">, IDatedObject {
  /**
   * Required if width and/or height are present
   * float (inches)
   */
  length: number;

  /**
   * Required if width and/or height are present
   * float (inches)
   */
  width: number;

  /**
   * Required if width and/or height are present
   * float (inches)
   */
  height: number;

  /**
   * Optional, one of our predefined_packages
   */
  predefined_package?: TPredefinedPackage;

  /**
   * Always required 
   * float (oz)
   */
  weight: number;
}

export declare type TInsuranceStatus = "new" | "pending" | "purchased" | "failed" | "cancelled";

/**
 * An Insurance object represents insurance for packages purchased both via the EasyPost API as well as shipments purchased through third parties and later registered with EasyPost. 
 * An Insurance is created automatically whenever you buy a Shipment through EasyPost and pass insurance options during the Buy call or in a later call to Insure a Shipment.
 * 
 * Insurance purchased through the Shipment Buy or Insure endpoints is immediately insured - there is no possibility of rejection based on tracking information, as the package was just created. 
 * On the other hand, Insurance purchased on shipments purchased outside of EasyPost requires creation with a tracking code so that EasyPost may confirm the package existence and current shipping status at the time of purchase.
 * 
 * Standalone insurance is created in a pending state to help distinguish it from insurance purchased for an EasyPost Shipment. 
 * Both kinds of Insurance use the Tracking system to receive periodic updates, and will report those updates to any appropriate Webhooks on file. 
 * Standalone insurance will cancel itself if the tracking information for the given tracking code shows evidence of having been shipped anytime before the insurance was purchased.
 * 
 * Unlike Shipments within EasyPost, Insurance objects register To and From Address objects according to the destination and ship-from locations of the package. 
 * This means that a Shipment with "is_return: true" actually ships to the listed From Address. 
 * Insurance does not have a concept of "is_return", so all insurance records refer to their true package destination as "to_address", regardless of whether or not the shipment is a return.
 * 
 * @see https://www.easypost.com/docs/api/node#insurance-object
 */
export declare interface IInsurance extends IObjectWithId<"Insurance">, IDatedObject {
  /**
   * The unique reference for this Insurance, if any
   */
  reference: string;

  /**
   * USD value of insured goods with sub-cent precision
   */
  amount: string;

  /**
   * The insurance provider used by EasyPost
   */
  provider: string;

  /**
   * An identifying number for some insurance providers used by EasyPost
   */
  provider_id: string;

  /**
   * The ID of the Shipment in EasyPost, if postage was purchased via EasyPost
   */
  shipment_id: string;

  /**
   * The tracking code of either the shipment within EasyPost, or provided by you during creation
   */
  tracking_code: string;

  /**
   * The current status of the insurance, possible values are "new", "pending", "purchased", "failed", or "cancelled"
   */
  status: TInsuranceStatus;

  /**
   * The associated Tracker object
   */
  tracker: ITracker;

  /**
   * The associated Address object for destination
   */
  to_address: IAddress;

  /**
   * The associated Address object for origin
   */
  from_address: IAddress;

  /**
   * The associated InsuranceFee object if any
   */
  fee: IFee;

  /**
   * The list of errors encountered during attempted purchase of the insurance
   */
  messages: string[];
}

export declare type TFeeType = "LabelFee" | "PostageFee" | "InsuranceFee" | "TrackerFee";

/**
 * Fee objects are used to represent the breakdown of charges made when purchasing an item on EasyPost. 
 * Shipments and Trackers both have associations to Fee objects.
 * 
 * Each Shipment object will have a Fee of type "LabelFee" to represent the label fee charged by EasyPost for the service. 
 * Shipments with postage collected by EasyPost (as opposed to shipments with postage collected directly by the carrier) will have a "PostageFee" according to the postage amount. 
 * Insurance on a Shipment will add an "InsuranceFee" with the insurance premium (not the covered value) for the amount. 
 * Tracker objects will have a "TrackerFee" with the price, even when a Tracker is free.
 * 
 * @see https://www.easypost.com/docs/api/node#fee-object
 */
export declare interface IFee extends IObjectWithId<"Fee"> {

  /**
   * The name of the category of fee. Possible types are "LabelFee", "PostageFee", "InsuranceFee", and "TrackerFee"
   */
  type: TFeeType;

  /**
   * USD value with sub-cent precision
   */
  amount: string;

  /**
   * Whether EasyPost has successfully charged your account for the fee
   */
  charged: boolean;

  /**
   * Whether the Fee has been refunded successfully
   */
  refunded: boolean;
}

export declare type TTrackerStatus = "unknown" | "pre_transit" | "in_transit" | "out_for_delivery" | "delivered" | "available_for_pickup" | "return_to_sender" | "failure" | "cancelled" | "error";

/**
 * A Tracker object contains all of the tracking information for a package. 
 * A Tracker is created automatically whenever you buy a Shipment through EasyPost.
 * Ff you don't use EasyPost to purchase your shipping labels, you can still track packages through our API by creating a Tracker object directly. 
 * Each Tracker is continually updated in the background as the package moves through its life cycle, regardless of whether or not the label was purchased through EasyPost.
 * 
 * After creation, a Tracker object will be updated periodically based on when the carrier provides EasyPost with new tracking information. 
 * This information can be consumed by using our webhooks infrastructure. 
 * Every time a Tracker is updated a webhook Event will be sent.
 * 
 * The Tracker object contains both the current information about the package as well as previous updates. 
 * All of the previous updates are stored in the tracking_details array. 
 * Each TrackingDetail object contains the status, the message from the carrier, and a TrackingLocation.
 * 
 * The TrackingLocation contains city, state, country, and zip information about the location where the package was scanned. 
 * The information each carrier provides is different, so some carriers may not make use of all of these fields.
 * 
 * Some Tracker objects may also contain a CarrierDetail, which stores some additional information about the Tracker that the carrier has made available to EasyPost. 
 * The CarrierDetail object contains the service and container_type of the package. 
 * Additionally, it also stores the est_delivery_date_local and est_delivery_time_local, which provide information about the local delivery time.
 * 
 * It's worth noting that tracking_codes are not globally unique. 
 * Each carrier promises uniqueness for a given tracking_code for a certain period of time, but the length of time varies greatly based on the specific carrier and service level. 
 * The carriers do eventually recycle tracking_codes, and for this reason enforcing uniqueness on the tracking_code field is not recommended. 
 * EasyPost does, however, prevent the creation of duplicate Trackers based on tracking_code and carrier; duplicate requests by the same User will simply return the original Tracker.
 * 
 * @see https://www.easypost.com/docs/api/node#tracker-object
 */
export declare interface ITracker extends IObjectWithId<"Tracker">, IDatedObject {
  /**
   * The tracking code provided by the carrier
   */
  tracking_code: string;

  /**
   * The current status of the package, possible values are "unknown", "pre_transit", "in_transit", "out_for_delivery", "delivered", "available_for_pickup", "return_to_sender", "failure", "cancelled" or "error"
   */
  status: TTrackerStatus;

  /**
   * The name of the person who signed for the package (if available)
   */
  signed_by: string;

  /**
   * The weight of the package as measured by the carrier in ounces (if available)
   * float (oz)
   */
  weight: number;

  /**
   * The estimated delivery date provided by the carrier (if available)
   */
  est_delivery_date: string; // TODO maybe type should be Date?

  /**
   * The id of the EasyPost Shipment object associated with the Tracker (if any)
   */
  shipment_id: string;

  /**
   * The name of the carrier handling the shipment
   */
  carrier: string;

  /**
   * Array of the associated TrackingDetail objects
   */
  tracking_details: ITrackingDetail[];

  /**
   * The associated CarrierDetail object (if available)
   */
  carrier_detail: ICarrierDetail;

  /**
   * URL to a publicly-accessible html page that shows tracking details for this tracker
   */
  public_url: string;

  /**
   * Array of the associated Fee objects
   */
  fees: IFee[];
}

export declare type TTrackingStatus = "unknown" | "pre_transit" | "in_transit" | "out_for_delivery" | "delivered" | "available_for_pickup" | "return_to_sender" | "failure" | "cancelled" | "error";

/**
 * @see https://www.easypost.com/docs/api/node#tracking-detail-object
 */
export declare interface ITrackingDetail extends IBaseObject<"TrackingDetail"> {
  /**
   * Description of the scan event
   */
  message: string;

  /**
   * Status of the package at the time of the scan event, possible values are "unknown", "pre_transit", "in_transit", "out_for_delivery", "delivered", "available_for_pickup", "return_to_sender", "failure", "cancelled" or "error"
   */
  status: TTrackingStatus;

  /**
   * The timestamp when the tracking scan occurred
   */
  datetime: string; // TODO maybe type should be Date?

  /**
   * The original source of the information for this scan event, usually the carrier
   */
  source: string;

  /**
   * The location associated with the scan event
   */
  tracking_location: ITrackingLocation;
}

/**
 * @see https://www.easypost.com/docs/api/node#tracking-location-object
 */
export declare interface ITrackingLocation extends IBaseObject<"TrackingLocation"> {
  /**
   * The city where the scan event occurred (if available)
   */
  city: string;

  /**
   * The state where the scan event occurred (if available)
   */
  state: string;

  /**
   * The country where the scan event occurred (if available)
   */
  country: string;

  /**
   * The postal code where the scan event occurred (if available)
   */
  zip: string;
}

/**
 * @see https://www.easypost.com/docs/api/node#carrier-detail-object
 */
export declare interface ICarrierDetail extends IBaseObject<"CarrierDetail"> {
  /**
   * The service level the associated shipment was shipped with (if available)
   */
  service: string;

  /**
   * The type of container the associated shipment was shipped in (if available)
   */
  container_type: string;

  /**
   * The estimated delivery date as provided by the carrier, in the local time zone (if available)
   */
  est_delivery_date_local: string;

  /**
   * The estimated delivery time as provided by the carrier, in the local time zone (if available)
   */
  est_delivery_time_local: string;

  /**
   * The location from which the package originated, stringified for presentation (if available)
   */
  origin_location: string;

  /**
   * The location from which the package originated, broken down by city/state/country/zip (if available)
   */
  origin_tracking_location: ITrackingLocation;

  /**
   * The location to which the package is being sent, stringified for presentation (if available)
   */
  destination_location: string;

  /**
   * The location to which the package is being sent, broken down by city/state/country/zip (if available)
   */
  destination_tracking_location: ITrackingLocation;

  /**
   * The date and time the carrier guarantees the package to be delivered by (if available)
   */
  guaranteed_delivery_date: string;

  /**
   * The alternate identifier for this package as provided by the carrier (if available)
   */
  alternate_identifier: string;

  /**
   * The date and time of the first attempt by the carrier to deliver the package (if available)
   */
  initial_delivery_attempt: string;
}

export declare type TBatchState = "creating" | "creation_failed" | "created" | "purchasing" | "purchase_failed" | "purchased" | "label_generating" | "label_generated";

/**
 * The Batch object allows you to perform operations on multiple Shipments at once. 
 * This includes scheduling a Pickup, creating a ScanForm and consolidating labels. 
 * Operations performed on Batches are asynchronous and take advantage of our webhook infrastructure.
 * 
 * @see https://www.easypost.com/docs/api/node#batch-object
 */
export declare interface IBatch extends IObjectWithId<"Batch">, IDatedObject {
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
  status: TBatchStatuses; // TODO

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

export declare type TBatchStatus = "postage_purchased" | "postage_purchase_failed" | "queued_for_purchase" | "creation_failed" | "created";
export declare type TBatchStatuses = { [key in TBatchStatus]: number; }

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
  reference?: string;

  /**
   * The current status. Possible values are "postage_purchased", "postage_purchase_failed", "queued_for_purchase", "creation_failed", and "created"
   */
  batch_status: TBatchStatus;

  /**
   * A human readable message for any errors that occurred during the Batch's life cycle
   */
  batch_message: string;
}

export declare type TCustomsContentsType = "documents" | "gift" | "merchandise" | "returned_goods" | "sample" | "other";

/**
 * CustomsInfo objects contain CustomsItem objects and all necessary information for the generation of customs forms required for international shipping.
 * 
 * Please see the Shipments documentation for examples of including a CustomsInfo object in a shipment.
 * 
 * @see https://www.easypost.com/docs/api/node#customs-info-object
 */
export declare interface ICustomsInfo extends IObjectWithId<"CustomsInfo">, IDatedObject {
  /**
   * "EEL" or "PFC"
   */
  eel_pfc: "EEL" | "PFC";

  /**
   * "documents", "gift", "merchandise", "returned_goods", "sample", or "other"
   */
  contents_type: TCustomsContentsType;

  /**
   * (max 255 characters) Human readable description of content. 
   * Required for certain carriers and always required if contents_type is "other"
   */
  contents_explanation: string;

  /**
   * Electronically certify the information provided
   */
  customs_certify: boolean;

  /**
   * Required if customs_certify is true
   */
  customs_signer: string;

  /**
   * "abandon" or "return", defaults to "return"
   */
  non_delivery_option: "abandon" | "return" | "return";

  /**
   * "none", "other", "quarantine", or "sanitary_phytosanitary_inspection"
   */
  restriction_type: "none" | "other" | "quarantine" | "sanitary_phytosanitary_inspection";

  /**
   * Required if restriction_type is not "none"
   */
  restriction_comments: string;

  /**
   * Describes to products being shipped
   */
  customs_items: ICustomsItem[];
}

/**
 * A CustomsItem object describes goods for international shipment and should be created then included in a CustomsInfo object.
 * 
 * @see https://www.easypost.com/docs/api/node#customs-item-object
 */
export declare interface ICustomsItem extends IObjectWithId<"CustomsItem">, IDatedObject {
  /**
   * Required, description of item being shipped
   */
  description: string;

  /**
   * Required, greater than zero
   * float
   */
  quantity: number;

  /**
   * Required, greater than zero, total value (unit value * quantity)
   * float (USD)
   */
  value: number;

  /**
   * Required, greater than zero, total weight (unit weight * quantity)
   * float (oz)
   */
  weight: number;

  /**
   * Harmonized Tariff Schedule, e.g. "6109.10.0012" for Men's T-shirts
   * 
   * @see https://hts.usitc.gov/
   */
  hs_tariff_number: string;

  /**
   * SKU/UPC or other product identifier
   */
  code: string;

  /**
   * Required, 2 char country code
   */
  origin_country: string;

  /**
   * 3 char currency code, default USD
   */
  currency: string;
}

/**
 * Webhook Events are triggered by changes in objects you've created via the API. 
 * Every time an Event related to one of your objects is created, EasyPost guarantees at least one POST request will be sent to each of the webhook URLs set up for your account. 
 * For this reason, we strongly encourage your webhook handler to be idempotent. 
 * See the webhooks guide for more information.
 * 
 * @see [webhooks guide] https://www.easypost.com/webhooks-guide
 * @see https://www.easypost.com/docs/api/node#events
 */
export declare interface IEvent extends IObjectWithId<"Event">, IDatedObject {
  /**
   * Result type and event name, see the "Possible Event Types" section for more information
   */
  description: string;

  /**
   * Previous values of relevant result attributes
   */
  previous_attributes: any;

  /**
   * The object associated with the Event. See the "object" attribute on the result to determine its specific type. 
   * This field will not be returned when retrieving events directly from the API
   */
  result: any;

  /**
   * The current status of the event. Possible values are "completed", "failed", "in_queue", "retrying", or "pending" (deprecated)
   * 
   * @deprecated
   */
  status: "completed" | "failed" | "in_queue" | "retrying" | "pending";

  /**
   * Webhook URLs that have not yet been successfully notified as of the time this webhook event was sent. 
   * The URL receiving the Event will still be listed in pending_urls, as will any other URLs that receive the Event at the same time
   */
  pending_urls: string[];

  /**
   * Webhook URLs that have already been successfully notified as of the time this webhook was sent
   */
  completed_urls: string[];
}

/**
 * The Order object represents a collection of packages and can be used for Multi-Piece Shipments. 
 * Like a single Shipment each Order consists of a "to" and "from" Address to be used for each Shipment within the Order. 
 * These Addresses will be copied to each Shipment so there is no need to specify them multiple times. 
 * Each Shipment must then specify its Parcel, Options, and CustomsInfo.
 * 
 * An Order created with valid Address Objects and Parcel data nested within the Order's Shipment object will automatically retrieve available shipping Rate options.
 * 
 * @see https://www.easypost.com/docs/api/node#order-object
 */
export declare interface IOrder extends IObjectWithId<"Order">, IDatedObject {
  /**
   * An optional field that may be used in place of id in other API endpoints
   */
  reference?: string;

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
  return_address: IAddress;

  /**
   * The buyer's address, defaults to to_address
   */
  buyer_address: IAddress;

  /**
   * All associated Shipment objects. Maximum of 100.
   */
  shipments: IShipment[];

  /**
   * All associated Rate objects
   */
  rates: IRate[];

  /**
   * Any carrier errors encountered during rating
   */
  messages: IMessage[];

  /**
   * Set true to create as a return
   */
  is_return: boolean;
}

/**
 * When rating a Shipment or Pickup, some carriers may fail to generate rates. 
 * These failures are returned as part of the Shipment or Pickup as part of their messages attribute, and follow a common object structure.
 * 
 * It is important to note that the message value for any member of this list comes directly from the carrier, not from EasyPost. 
 * This means that if you see an authentication or other non-shipping error here, it is not an issue between you and EasyPost, it is an issue between you and the carrier, or an issue with the given data.
 * 
 * @see https://www.easypost.com/docs/api/node#message-object
 */
export declare interface IMessage {
  /**
   * the name of the carrier generating the error, e.g. "UPS"
   */
  carrier: string;

  /**
   * the category of error that occurred. Most frequently "rate_error"
   */
  type: string;

  /**
   * the string from the carrier explaining the problem
   */
  message: string;

  /**
   * the account id of the carrier. Useful if you have multiple accounts with the same carrier
   */
  carrier_account_id: string;
}

/**
 * After a Shipment is successfully created, it will automatically fetch Rates. 
 * You can limit the CarrierAccounts to use for rating by passing the carrier_accounts parameter upon Shipment creation.
 * 
 * There are three rate types: the actual rate that will be purchased, rate and currency, the published non-discounted rate, list_rate and list_currency, and the rate if purchased from the post office, retail_rate and retail_currency.
 * 
 * @see https://www.easypost.com/docs/api/node#rate-object
 */
export declare interface IRate extends IObjectWithId<"Rate">, IDatedObject {
  /**
   * service level/name
   * @see https://www.easypost.com/docs/api/node#service-levels
   */
  service: string;

  /**
   * name of carrier
   */
  carrier: string;

  /**
   * ID of the CarrierAccount record used to generate this rate
   */
  carrier_account_id: string;

  /**
   * 	ID of the Shipment this rate belongs to
   */
  shipment_id: string;

  /**
   * the actual rate quote for this service
   */
  rate: string;

  /**
   * currency for the rate
   */
  currency: string;

  /**
   * the retail rate is the in-store rate given with no account
   */
  retail_rate: string;

  /**
   * currency for the retail rate
   */
  retail_currency: string;

  /**
   * the list rate is the non-negotiated rate given for having an account with the carrier
   */
  list_rate: string;

  /**
   * currency for the list rate
   */
  list_currency: string;

  /**
   * delivery days for this service
   */
  delivery_days: number;

  /**
   * date for delivery
   */
  delivery_date: string;

  /**
   * indicates if delivery window is guaranteed (true) or not (false)
   */
  delivery_date_guaranteed: boolean;
}

/**
 * The workhorse of the EasyPost API, a Shipment is made up of a "to" and "from" Address, the Parcel being shipped, and any customs forms required for international deliveries. 
 * Once created a Shipment object is used to retrieve shipping Rates and purchase a label.
 * 
 * A Shipment created with a valid to_address, from_address, and parcel will automatically populate its rates attribute.
 * 
 * @see https://www.easypost.com/docs/api/node#shipment-object
 */
export declare interface IShipment extends IObjectWithId<"Shipment">, IDatedObject {
  /**
   * An optional field that may be used in place of id in other API endpoints
   */
  reference?: string;

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
  return_address: IAddress;

  /**
   * The buyer's address, defaults to to_address
   */
  buyer_address: IAddress;

  /**
   * The dimensions and weight of the package
   */
  parcel: IParcel;

  /**
   * Information for the processing of customs
   */
  customs_info: ICustomsInfo;

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
   * All of the options passed to the shipment, discussed in more depth below
   */
  options: IOptions;

  /**
   * Set true to create as a return, discussed in more depth below
   */
  is_return: boolean;

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
  refund_status: "submitted" | "refunded" | "rejected";

  /**
   * The ID of the batch that contains this shipment, if any
   */
  batch_id: string;

  /**
   * The current state of the associated BatchShipment
   */
  batch_status: TBatchStatus; // TODO state or status? (Description says state but property says status)

  /**
   * The current message of the associated BatchShipment
   */
  batch_message: string;
}

/**
  *  - FedEx
  *    - (null) - If print_custom_1_code is not provided it defaults to Customer Reference
  *    - PO - Purchase Order Number
  *    - DP - Department Number
  *    - RMA - Return Merchandise Authorization
  *  - UPS
  *    - AJ - Accounts Receivable Customer Account
  *    - AT - Appropriation Number
  *    - BM - Bill of Lading Number
  *    - 9V - Collect on Delivery (COD) Number
  *    - ON - Dealer Order Number
  *    - DP - Department Number
  *    - 3Q - Food and Drug Administration (FDA) Product Code
  *    - IK - Invoice Number
  *    - MK - Manifest Key Number
  *    - MJ - Model Number
  *    - PM - Part Number
  *    - PC - Production Code
  *    - PO - Purchase Order Number
  *    - RQ - Purchase Request Number
  *    - RZ - Return Authorization Number
  *    - SA - Salesperson Number
  *    - SE - Serial Number
  *    - ST - Store Number
  *    - TN - Transaction Reference Number
  *    - EI - Employer's ID Number
  *    - TJ - Federal Taxpayer ID No.
  */
export declare type TPrintCustomCode = "PO" | "DP" | "RMA" | "AJ" | "AT" | "BM" | "9V" | "ON" | "3Q" | "IK" | "MK" | "MJ" | "PM" | "PC" | "RQ" | "RZ" | "SA" | "SE" | "ST" | "TN" | "EI" | "TJ"; // TODO enum maybe?

/**
 * Shipments can have a variety of additional options which you can specify when creating a shipment. 
 * The Options object can be populated with the keys below.
 * 
 * @see https://www.easypost.com/docs/api/node#options-object
 */
export declare interface IOptions {
  /**
   * Setting this option to true, will add an additional handling charge. 
   * An Additional Handling charge may be applied to the following:
   *  - Any article that is encased in an outside shipping container made of metal or wood.
   *  - Any item, such as a barrel, drum, pail or tire, that is not fully encased in a corrugated cardboard shipping container.
   *  - Any package with the longest side exceeding 60 inches or its second longest side exceeding 30 inches.
   *  - Any package with an actual weight greater than 70 pounds.
   */
  additional_handling: boolean;

  /**
   * Setting this option to "0", will allow the minimum amount of address information to pass the validation check. 
   * Only for USPS postage.
   */
  address_validation_level: string;

  /**
   * Set this option to true if your shipment contains alcohol.
   *  - UPS - only supported for US Domestic shipments
   *  - FedEx - only supported for US Domestic shipments
   *  - Canada Post - Requires adult signature 19 years or older. If you want adult signature 18 years or older, instead use delivery_confirmation: ADULT_SIGNATURE
   */
  alcohol: boolean;

  /**
   * Setting this option to true will indicate to the carrier to prefer delivery by drone, if the carrier supports drone delivery.
   */
  by_drone: boolean;

  /**
   * Setting this to true will add a charge to reduce carbon emissions.
   */
  carbon_neutral: boolean;

  /**
   * Adding an amount will have the carrier collect the specified amount from the recipient.
   */
  cod_amount: string;

  /**
   * Method for payment. "CASH", "CHECK", "MONEY_ORDER"
   */
  cod_method: "CASH" | "CHECK" | "MONEY_ORDER";

  /**
   * The ID of the Address to which the COD payment should be returned. 
   * Defaults to the origin address. 
   * Only available on FedEx shipments.
   */
  cod_address_id: string;

  /**
   * Which currency this shipment will show for rates if carrier allows.
   */
  currency: string;

  /**
   * If you want to request a signature, you can pass "ADULT_SIGNATURE" or "SIGNATURE". 
   * You may also request "NO_SIGNATURE" to leave the package at the door.
   *  - All - some options may be limited for international shipments
   *  - FedEx - "INDIRECT_SIGNATURE" is also an option
   *  - USPS - additional options
   *    - "ADULT_SIGNATURE_RESTRICTED"
   *    - "SIGNATURE_RESTRICTED"
   */
  delivery_confirmation: "ADULT_SIGNATURE" | "SIGNATURE" | "NO_SIGNATURE" | "INDIRECT_SIGNATURE" | "ADULT_SIGNATURE_RESTRICTED" | "SIGNATURE_RESTRICTED";

  /**
   * Method the customer will use to transfer the package to the carrier. 
   * "REGULAR_PICKUP", "SCHEDULED_PICKUP", "RETAIL_LOCATION", "STATION" or "DROP_BOX". 
   * Supported carriers and their corresponding carrier dropoff codes:
   *  - FedEx
   *    - "REGULAR_PICKUP" - "REGULAR_PICKUP" (default)
   *    - "SCHEDULED_PICKUP" - "REQUEST_COURIER"
   *    - "RETAIL_LOCATION" - "BUSINESS_SERVICE_CENTER"
   *    - "STATION" - "STATION"
   *    - "DROP_BOX" - "DROP_BOX"
   */
  dropoff_type: "REGULAR_PICKUP" | "SCHEDULED_PICKUP" | "RETAIL_LOCATION" | "STATION" | "DROP_BOX" | "REQUEST_COURIER" | "BUSINESS_SERVICE_CENTER";

  /**
   * Package contents contain dry ice.
   *  - UPS - Need dry_ice_weight to be set
   *  - UPS MailInnovations - Need dry_ice_weight to be set
   *  - FedEx - Need dry_ice_weight to be set
   */
  dry_ice: boolean;

  /**
   * If the dry ice is for medical use, set this option to true.
   *  - UPS - Need dry_ice_weight to be set
   *  - UPS MailInnovations - Need dry_ice_weight to be set
   */
  dry_ice_medical: boolean; // TODO docs say string but description indicates boolean value

  /**
   * Weight of the dry ice in ounces.
   *  - UPS - Need dry_ice to be set
   *  - UPS MailInnovations - Need dry_ice to be set
   *  - FedEx - Need dry_ice to be set
   */
  dry_ice_weight: string;

  /**
   * Possible values "ADDRESS_SERVICE_REQUESTED", "FORWARDING_SERVICE_REQUESTED", "CHANGE_SERVICE_REQUESTED", "RETURN_SERVICE_REQUESTED", "LEAVE_IF_NO_RESPONSE"
   */
  endorsement: "ADDRESS_SERVICE_REQUESTED" | "FORWARDING_SERVICE_REQUESTED" | "CHANGE_SERVICE_REQUESTED" | "RETURN_SERVICE_REQUESTED" | "LEAVE_IF_NO_RESPONSE";

  /**
   * Additional cost to be added to the invoice of this shipment. 
   * Only applies to UPS currently.
   */
  freight_charge: number;

  /**
   * This is to designate special instructions for the carrier like "Do not drop!".
   */
  handling_instructions: string;

  /**
   * Dangerous goods indicator. 
   * Possible values are "PRIMARY_CONTAINED", "PRIMARY_PACKED", "PRIMARY", "SECONDARY_CONTAINED", "SECONDARY_PACKED", "SECONDARY", "ORMD", "LIMITED_QUANTITY", "LITHIUM". 
   * Applies to USPS, FedEx and DHL eCommerce.
   */
  hazmat: "PRIMARY_CONTAINED" | "PRIMARY_PACKED" | "PRIMARY" | "SECONDARY_CONTAINED" | "SECONDARY_PACKED" | "SECONDARY" | "ORMD" | "LIMITED_QUANTITY" | "LITHIUM";

  /**
   * Package will wait at carrier facility for pickup.
   */
  hold_for_pickup: boolean;

  /**
   * Incoterm negotiated for shipment. 
   * Supported values are "EXW", "FCA", "CPT", "CIP", "DAT", "DAP", "DDP", "FAS", "FOB", "CFR", and "CIF". 
   * Setting this value to anything other than "DDP" will pass the cost and responsibility of duties on to the recipient of the package(s), as specified by Incoterms rules
   */
  incoterm: "EXW" | "FCA" | "CPT" | "CIP" | "DAT" | "DAP" | "DDP" | "FAS" | "FOB" | "CFR" | "CIF";

  /**
   * This will print an invoice number on the postage label.
   */
  invoice_number: string;

  /**
   * Set the date that will appear on the postage label. 
   * Accepts ISO 8601 formatted string including time zone offset. 
   * EasyPost stores all dates as UTC time.
   */
  label_date: string;

  /**
   * Supported label formats include "PNG", "PDF", "ZPL", and "EPL2". 
   * "PNG" is the only format that allows for conversion.
   * 
   * @see https://www.easypost.com/docs/api#convert-the-label-format-of-a-shipment
   */
  label_format: "PNG" | "PDF" | "ZPL" | "EPL2";

  /**
   * Whether or not the parcel can be processed by the carriers equipment.
   */
  machinable: boolean;

  /**
   * Setting payment type to bill the correct account for purchasing postage.
   */
  payment: {
    /**
     * Supported values are "SENDER", "THIRD_PARTY", "RECEIVER", "COLLECT". Defaults to SENDER.
     */
    type: "SENDER" | "THIRD_PARTY" | "RECEIVER" | "COLLECT";

    /**
     * Setting account number. 
     * Required for RECEIVER and THIRD_PARTY.
     */
    account: string;

    /**
     * Setting country code that the account is based in. 
     * Required for THIRD_PARTY.
     */
    country: string;

    /**
     * Setting postal code that the account is based in. 
     * Required for RECEIVER and THIRD_PARTY.
     */
    postal_code: string;
  };

  /**
   * You can optionally print custom messages on labels. 
   * The locations of these fields show up on different spots on the carrier's labels.
   */
  print_custom_1: string;

  /**
   * An additional message on the label. Same restrictions as print_custom_1
   */
  print_custom_2: string;

  /**
   * An additional message on the label. Same restrictions as print_custom_1
   */
  print_custom_3: string;

  /**
   * Create a barcode for this custom reference if supported by carrier.
   */
  print_custom_1_barcode: boolean;

  /**
   * Create a barcode for this custom reference if supported by carrier.
   */
  print_custom_2_barcode: boolean;

  /**
   * Create a barcode for this custom reference if supported by carrier.
   */
  print_custom_3_barcode: boolean;

  /**
   * Specify the type of print_custom_1.
   */
  print_custom_1_code: TPrintCustomCode;

  /**
   * Specify the type of print_custom_2.
   */
  print_custom_2_code: TPrintCustomCode;

  /**
   * Specify the type of print_custom_3.
   */
  print_custom_3_code: TPrintCustomCode;

  /**
   * Set this value to true for delivery on Saturday. 
   * When setting the saturday_delivery option, you will only get rates for services that are eligible for saturday delivery. 
   * If no services are available for saturday delivery, then you will not be returned any rates. 
   * You may need to create 2 shipments, one with the saturday_delivery option set on one without to get all your eligible rates.
   */
  saturday_delivery: boolean;

  /**
   * This option allows you to request restrictive rates from USPS. 
   * Can set to 'USPS.MEDIAMAIL' or 'USPS.LIBRARYMAIL'.
   */
  special_rates_eligibility: 'USPS.MEDIAMAIL' | 'USPS.LIBRARYMAIL';

  /**
   * You can use this to override the hub ID you have on your account.
   */
  smartpost_hub: string;

  /**
   * The manifest ID is used to group SmartPost packages onto a manifest for each trailer.
   */
  smartpost_manifest: string;

  /**
   * A reference ID for aggregating DHL eCommerce billing data.
   */
  billing_ref: string;

  /**
   * Certified Mail provides the sender with a mailing receipt and, upon request, electronic verification that an article was delivered or that a delivery attempt was made.
   */
  certified_mail: boolean;

  /**
   * Registered Mail is the most secure service that the USPS offers. 
   * It incorporates a system of receipts to monitor the movement of the mail from the point of acceptance to delivery
   */
  registered_mail: boolean;

  /**
   * The value of the package contents
   */
  registered_mail_amount: number;

  /**
   * An electronic return receipt may be purchased at the time of mailing and provides a shipper with evidence of delivery (to whom the mail was delivered and date of delivery), and information about the recipient's actual delivery address. 
   * Only applies to the USPS.
   */
  return_receipt: boolean;
}


/**
 * @see https://www.easypost.com/docs/api/node#form-object
 */
export declare interface IForm extends IObjectWithId<"Form">, IDatedObject {
  /**
   * The type of form that we returned, can be one of "high_value_report", "commercial_invoice", "cod_return_label", "order_summary", "cn22"
   */
  form_type: "high_value_report" | "commercial_invoice" | "cod_return_label" | "order_summary" | "cn22";

  /**
   * The address we return the form back at
   */
  form_url: string;

  /**
   * If we have submitted the form to the carrier on behalf of the customer
   */
  submitted_electronically: boolean;
}


/**
 * The Pickup object allows you to schedule a pickup from your carrier from your customer's residence or place of business. 
 * Supported carriers include:
 *  - Asendia Europe
 *  - Canada Post
 *  - Canpar
 *  - DHL Express
 *  - Endicia
 *  - FedEx
 *  - GSO
 *  - Lasership
 *  - LSO
 *  - Ontrac
 *  - Purolator
 *  - UPS
 *  - USPS
 * 
 * After a Pickup is successfully created, it will automatically fetch PickupRates for each CarrierAccount specified that supports scheduled pickups. 
 * Then a PickupRate must be selected and purchased before the pickup can be successfully scheduled.
 * 
 * @see https://www.easypost.com/docs/api/node#pickup-object
 */
export declare interface IPickup extends IObjectWithId<"Pickup">, IDatedObject {
  /**
   * An optional field that may be used in place of ID in some API endpoints
   */
  reference?: string;

  /**
   * One of: "unknown", "scheduled", or "canceled"
   */
  status: "unknown" | "scheduled" | "canceled";

  /**
   * The earliest time at which the package is available to pick up
   */
  min_datetime: string;

  /**
   * The latest time at which the package is available to pick up. 
   * Must be later than the min_datetime
   */
  max_datetime: string;

  /**
   * Is the pickup address the account's address?
   */
  is_account_address: boolean;

  /**
   * Additional text to help the driver successfully obtain the package
   */
  instructions: string;

  /**
   * A list of messages containing carrier errors encountered during pickup rate generation
   */
  messages: IMessage[];

  /**
   * The confirmation number for a booked pickup from the carrier
   */
  confirmation: string;

  /**
   * The associated Shipment
   */
  shipment: IShipment;

  /**
   * The associated Address
   */
  address: IAddress;

  /**
   * The list of carriers (if empty, all carriers were used) used to generate pickup rates
   */
  carrier_accounts: ICarrierAccount[];

  /**
   * The list of different pickup rates across valid carrier accounts for the shipment
   */
  pickup_rates: IPickupRate[];
}


/**
 * @see https://www.easypost.com/docs/api/node#pickup-rate-object
 */
export declare interface IPickupRate extends IObjectWithId<"PickupRate">, IDatedObject {
  /**
   * service name
   */
  service: string;

  /**
   * name of carrier
   */
  carrier: string;

  /**
   * the actual rate quote for this service
   */
  rate: string;

  /**
   * currency for the rate
   */
  currency: string;

  /**
   * the ID of the pickup this is a quote for
   */
  pickup_id: string;
}

/**
 * A CarrierAccount encapsulates your credentials with the carrier. 
 * The CarrierAccount object provides CRUD operations for all CarrierAccounts.
 * 
 * Each EasyPost account is automatically provided a USPS account managed by EasyPost.
 * 
 * Other operations, such as Shipment creation, can reference CarrierAccounts to reduce the scope of data returned. 
 * For instance, you may have multiple warehouses that need to use distinct FedEx SmartPost credentials to request the correct rates. 
 * Rate objects will include a carrier_account_id field which can be used to determine the account used for rating.
 * 
 * @see https://www.easypost.com/docs/api/node#carrier-account-object
 */
export declare interface ICarrierAccount extends IObjectWithId<"CarrierAccount">, IDatedObject {
  /**
   * The name of the carrier type.
   */
  type: string;

  /**
   * Contains "credentials" and/or "test_credentials", or may be empty
   */
  fields: ICarrierAccountFields;

  /**
   * If clone is true, only the reference and description are possible to update
   */
  clone: boolean;

  /**
   * An optional, user-readable field to help distinguish accounts
   */
  description: string;

  /**
   * An optional field that may be used in place of carrier_account_id in other API endpoints
   */
  reference: string;

  /**
   * The name used when displaying a readable value for the type of the account
   */
  readable: string;

  /**
   * Unlike the "credentials" object contained in "fields", this nullable object contains just raw credential pairs for client library consumption
   */
  credentials: ICarrierAccountCredentials;

  /**
   * Unlike the "test_credentials" object contained in "fields", this nullable object contains just raw test_credential pairs for client library consumption
   */
  test_credentials: ICarrierAccountCredentials;
}

export declare interface ICarrierAccountCredentials {
  account_number: string;
  user_id: string;
  password: string;
  access_license_number: string;
}

/**
 * @see https://www.easypost.com/docs/api/node#carrier-account-fields-object
 */
export declare interface ICarrierAccountFields {
  /**
   * Credentials used in the production environment.
   */
  credentials: ICarrierAccountField;

  /**
   * Credentials used in the test environment.
   */
  test_credentials: ICarrierAccountField;

  /**
   * For USPS this designates that no credentials are required.
   */
  auto_link: boolean;

  /**
   * When present, a separate authentication process will be required through the UI to link this account type.
   */
  custom_workflow: boolean;
}

/**
 * @see https://www.easypost.com/docs/api/node#carrier-account-field-object
 */
export declare interface ICarrierAccountField {
  /**
   * Each key in the sub-objects of a CarrierAccount's fields is the name of a settable field
   */
  key: string;

  /**
   * The visibility value is used to control form field types, and is discussed in the CarrierType section
   */
  visibility: string;

  /**
   * The label value is used in form rendering to display a more precise field name
   */
  label: string;

  /**
   * Checkbox fields use "0" and "1" as False and True, all other field types present plaintext, partly-masked, or masked credential data for reference
   */
  value: string;
}


/**
 * A ScanForm can be created to speed up and simplify the carrier pickup process. 
 * The ScanForm is one document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier. 
 * The following criteria must met before creation:
 *  - Refunded Shipments cannot be added
 *  - Each Shipment must have the same origin address
 *  - Shipments must all be dated (using the label_date option) on or after the date the form is generated
 *  - Shipments cannot be added to more than one ScanForm
 *  - Existing ScanForms may not be updated with additional Shipments. If a ScanForm already exists, and new Shipments need to be added, a new ScanForm must be created.
 *  - Shipments should be provided in the form of an array
 * 
 * @see https://www.easypost.com/docs/api/node#scan-form-object
 */
export declare interface IScanForm extends IObjectWithId<"ScanForm">, IDatedObject {
  /**
   * Current status. 
   * Possible values are "creating", "created" and "failed"
   */
  status: "creating" | "created" | "failed";

  /**
   * Human readable message explaining any failures
   */
  message: string;

  /**
   * Address that the Shipments will be shipped from
   */
  address: IAddress;

  /**
   * Tracking codes included on the ScanForm
   */
  tracking_codes: string[];

  /**
   * Url of the document
   */
  form_url: string;

  /**
   * File format of the document
   */
  form_file_type: string;

  /**
   * The id of the associated Batch. Unique, starts with "batch_"
   */
  batch_id: string;
}

/**
 * @todo PostageLabel hasn't be documented - https://www.easypost.com/docs/api/node
 */
export declare interface IPostageLabel extends IObjectWithId<"PostageLabel">, IDatedObject {
  date_advance: number;
  integrated_form: string;
  label_date: string;
  label_resolution: number;
  label_size: string;
  label_type: string;
  label_url: string;
  label_file_type: string;
  label_pdf_url: string;
  label_epl2_url: string;
  label_zpl_url: string;
}


/**
 * Each Webhook contains the url which EasyPost will notify whenever an object in our system updates. 
 * Several types of objects are processed asynchronously in the EasyPost system, so whenever an object updates, an Event is sent via HTTP POST to each configured webhook URL. 
 * The Webhook object provides CRUD operations for all Webhooks.
 * 
 * Currently, our recommended best practice for securing Webhooks involves using basic authentication and HTTPS on your endpoint. 
 * This will help prevent any altering of any information communicated to you by EasyPost, prevent any third parties from seeing your webhooks in transit, and will prevent any third parties from masquerading as EasyPost and sending fraudulent data. 
 * EasyPost performs certificate validation and requires any TLS-enabled (HTTPS) webhook recipients to have a certificate signed by a public trusted certification authority. 
 * We do not support sending webhooks to over SSLv2, SSLv3, or any connection using so-called export-grade ciphers. 
 * For documentation on how to set up your server with TLS, we recommend Mozilla's guide to Server-Side TLS and Qualys's SSL/TLS deployment best practices guide.
 * 
 * In general, a Webhook's endpoint should return a status code of 2XX. 
 * A 200 is preferred, but any 2XX status will indicate to our system that the Webhook request was successful. 
 * Endpoints that return a large volume and rate of failures over a period of time will get automatically disabled by the system; a disabled Webhook can be re-enabled using the Webhook update endpoint.
 * 
 * @todo [Webhook Object] anchor links to Report Object - need to fix
 * @see https://www.easypost.com/docs/api/node#webhooks
 */
export declare interface IWebhook extends IObjectWithId<"Webhook"> {
  /**
   * http://example.com
   */
  url: string;

  /**
   * the timestamp at which the webhook was most recently disabled (if any)
   */
  disabled_at: string;
}

export declare type TReportObject = "CashFlowReport" | "PaymentLogReport" | "RefundReport" | "ShipmentReport" | "ShipmentInvoiceReport" | "TrackerReport";

/**
 * A Report contains a csv that is a log of all the objects created within a certain time frame.
 * 
 * Reports can be generated using the Reports Endpoint. 
 * You can create and view Reports created between any time frame defined between the start_date and end_date.
 * 
 * The Report api can be categorized into several types. 
 * These types determine which EasyPost Object to produce a Report for, and should be passed as the type in our libraries:
 *  - payment_log
 *  - refund
 *  - shipment
 *  - shipment_invoice
 *  - tracker
 * 
 * @see https://www.easypost.com/docs/api/node#report-object
 */
export declare interface IReport extends IObjectWithId<TReportObject>, IDatedObject {
  /**
   * "new", "available", "failed", or null
   */
  status: "new" | "available" | "failed" | null;

  /**
   * A date string in YYYY-MM-DD form eg: "2016-02-02"
   */
  start_date: string;

  /**
   * A date string in YYYY-MM-DD form eg: "2016-02-03"
   */
  end_date: string;

  /**
   * Set true if you would like to include Refunds /Shipments /Trackers created by child users
   */
  include_children: boolean;

  /**
   * A url that contains a link to the Report. 
   * Expires 30 seconds after retrieving this object
   */
  url: string;

  /**
   * Url expiring time
   */
  url_expires_at: string;

  /**
   * Set true if you would like to send an email containing the Report
   */
  send_email: boolean;
}


/**
 * The CarrierType object provides an export declare interface for determining the valid fields of a CarrierAccount. 
 * The list of CarrierType objects only changes when a new carrier is added to EasyPost.
 * 
 * The CarrierType objects consist of their top level attributes as well as a fields object that contains credentials and sometimes test_credentials sub-objects, 
 * which themselves are collections of attributes for CarrierAccount creation as well as metadata about presentation and the naming of said attributes.
 * 
 * There are a couple special case CarrierAccounts, with structures differing somewhat from the norm. 
 * For instance, instead of credentials for UspsAccount, it has only auto_link: true, which indicates that it is an account that can be added or removed without any carrier-specific fields.
 * 
 * The other custom option in the fields list is custom_workflow: true, which indicates that the EasyPost website export declare interface includes special processing for signups for the associated CarrierType. 
 * Carriers with a custom workflow will also present their normal credential rules, but it is considered unsafe to directly add a CarrierAccount of this type with these attributes filled out via another source than the EasyPost custom workflow.
 * 
 * @see https://www.easypost.com/docs/api/node#carrier-type-object
 */
export declare interface ICarrierType extends IBaseObject<"CarrierType"> {
  /**
   * Specifies the CarrierAccount type.
   */
  type: string;

  /**
   * Contains at least one of the following keys: "auto_link", "credentials", "test_credentials", and "custom_workflow"
   */
  fields: ICarrierTypeFields;
}


/**
 * @see https://www.easypost.com/docs/api/node#carrier-type-fields-object
 */
export declare interface ICarrierTypeFields {
  /**
   * If this key is present with the value of true, no other attributes are needed for CarrierAccount creation
   */
  auto_link: boolean;

  /**
   * If this key is present with the value of true, CarrierAccount creation of this type requires extra work not handled by the CarrierAccount standard API
   */
  custom_workflow: boolean;

  /**
   * If this object is present, required attribute names and their metadata are presented inside
   */
  credentials: ICarrierTypeCredentials;

  /**
   * If this object is present, it contains attribute names and metadata just as the credentials object. 
   * It is not required for CarrierAccount creation if you do not plan on using the carrier account for test mode
   */
  test_credentials: ICarrierTypeCredentials;
}

/**
 * @see https://www.easypost.com/docs/api/node#carrier-type-credentials-object
 */
export declare interface ICarrierTypeCredentials {
  /**
   * The key for each attribute sub-object within credentials is the name of the attribute for submission on CarrierAccounts
   */
  name: string;

  /**
   * There are five possible values, which encode the security need and storage type for each attribute: "visible", "checkbox", "fake", "password", and "masked"
   */
  visibility: "visible" | "checkbox" | "fake" | "password" | "masked";

  /**
   * Most attributes have generic names, so for clarity a "label" value is provided for clearer representation when rendering forms
   */
  label: string;
}


/**
 * The User object can be used to manage your own account and to create child accounts. 
 * Only a Production mode API key can be used to make requests against the Users API.
 * 
 * Balance and recharge values on User objects are expressed in higher precision USD.
 * 
 * @see https://www.easypost.com/docs/api/node#user-object
 */
export declare interface IUser extends IObjectWithId<"User"> {
  /**
   * The ID of the parent user object. 
   * Top-level users are defined as users with no parent
   */
  parent_id: string;

  /**
   * First and last name required
   */
  name: string;

  /**
   * Required
   */
  email: string;

  /**
   * Optional
   */
  phone_number: string;

  /**
   * Formatted as string "XX.XXXXX"
   */
  balance: string;

  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  recharge_amount: string;

  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  secondary_recharge_amount: string;

  /**
   * Number of cents USD that when your balance drops below, we automatically recharge your account with your primary payment method.
   */
  recharge_threshold: string;

  /**
   * All associated children
   */
  children: IUser[];
}

/**
 * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments
 */
export declare interface IShipmentListParameters {
  /**
   * Optional pagination parameter. 
   * Only shipments created before the given ID will be included. 
   * May not be used with after_id
   */
  before_id?: string;

  /**
   * Optional pagination parameter. 
   * Only shipments created after the given ID will be included. 
   * May not be used with before_id
   */
  after_id?: string;

  /**
   * Only return Shipments created after this timestamp. 
   * Defaults to 1 month ago, or 1 month before a passed end_datetime
   */
  start_datetime?: string;

  /**
   * Only return Shipments created before this timestamp. 
   * Defaults to end of the current day, or 1 month after a passed start_datetime
   */
  end_datetime?: string;

  /**
   * The number of Shipments to return on each page. 
   * The maximum value is 100
   */
  page_size?: number;

  /**
   * Only include Shipments that have been purchased. 
   * Default is true
   */
  purchased?: boolean;

  /**
   * Also include Shipments created by Child Users. 
   * Defaults to false
   */
  include_children?: boolean;
}


type ParametersToOmitOnCreate = 'id' | 'object' | 'mode' | 'created_at' | 'updated_at';


/**
 * @see https://www.easypost.com/docs/api/node#create-and-verify-addresses
 */
export declare interface IAddressCreateParameters extends Omit<IAddress, ParametersToOmitOnCreate | 'verifications'> {
  /**
   * The verifications to perform when creating. 
   * verify_strict takes precedence. 
   * true will perform both delivery and zip4.
   */
  verify: boolean | ['delivery', 'zip4'];

  /**
   * The verifications to perform when creating. 
   * The failure of any of these verifications causes the whole request to fail. 
   * true will perform both delivery and zip4
   */
  verify_strict: boolean | ['delivery', 'zip4'];
}

export declare class Address implements IAddress {
  public constructor(input: DeepPartial<IAddressCreateParameters>);

  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  residential: boolean;
  carrier_facility: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  federal_tax_id: string;
  state_tax_id: string;
  verifications: IVerifications;
  id: string;
  mode: "test" | "production";
  object: "Address";

  /**
   * Depending on your use case an Address can be used in many different ways. 
   * Certain carriers allow rating between two zip codes, but full addresses are required to purchase postage. 
   * It is recommended to provide as much information as possible during creation and to reuse these objects whenever possible.
   * 
   * Address objects can also be created inline while creating another object, for example during Shipment Creation.
   * 
   * Verify an Address
   *  - Verifying an Address before you ship is a great way to reduce issues with delivery.
   *    Creating a verified Address is as simple as including an enumerated list of the verifications you'd like EasyPost to perform in the verify or verify_strict url parameters. 
   *    If any of the verification checks included in the verify_strict list fail an error will be returned from the API. 
   *    The example below demonstrates the most common verification: "delivery", which checks that the address is deliverable and sets its residential delivery indicator.
   * 
   *  - The most effective time to perform address verification is when your customer, or the person entering the delivery address, is present. 
   *    When designing a shopping cart it is recommended to ask the shopper for their address and verify it on the spot. 
   *    If verification fails, ask them to double check their input; if they confirm that their data is correct, assume they know their address more correctly than the verification process.
   * 
   * @see https://www.easypost.com/docs/api/node#create-and-verify-addresses
   */
  public save(): Promise<Address>;

  /**
   * An Address can be retrieved by its id.
   * 
   * @see https://www.easypost.com/docs/api/node#retrieve-an-address
   * 
   * @param addressId Unique, begins with "adr_"
   */
  static retrieve(addressId: string): Promise<Address>;
}

export declare class Parcel implements IParcel {
  public constructor(input: DeepPartial<IParcel>);

  length: number;
  width: number;
  height: number;
  predefined_package?: TPredefinedPackage;
  weight: number;
  id: string;
  mode: "test" | "production";
  object: "Parcel";
  created_at: string;
  updated_at: string;

  public save(): Promise<IParcel>;
}

export declare class Shipment implements IShipment {
  public constructor(input: DeepPartial<IShipment>);

  reference?: string;
  to_address: IAddress;
  from_address: IAddress;
  return_address: IAddress;
  buyer_address: IAddress;
  parcel: IParcel;
  customs_info: ICustomsInfo;
  scan_form: IScanForm;
  forms: IForm[];
  insurance: IInsurance;
  rates: IRate[];
  selected_rate: IRate;
  postage_label: IPostageLabel;
  messages: IMessage[];
  options: IOptions;
  is_return: boolean;
  tracking_code: string;
  usps_zone: string;
  status: string;
  tracker: ITracker;
  fees: IFee[];
  refund_status: "submitted" | "refunded" | "rejected";
  batch_id: string;
  batch_status: TBatchStatus;
  batch_message: string;
  id: string;
  mode: "test" | "production";
  object: "Shipment";
  created_at: string;
  updated_at: string;

  public save(): Promise<Shipment>;
  public all(params?: IShipmentListParameters): Promise<Shipment[]>;
}

export declare class CarrierAccount implements ICarrierAccount {
  public constructor(input: DeepPartial<ICarrierAccount>);

  type: string;
  fields: ICarrierAccountFields;
  clone: boolean;
  description: string;
  reference: string;
  readable: string;
  credentials: ICarrierAccountCredentials;
  test_credentials: ICarrierAccountCredentials;
  id: string;
  mode: "test" | "production";
  object: "CarrierAccount";
  created_at: string;
  updated_at: string;

  public save(): Promise<CarrierAccount>;
  public all(): Promise<CarrierAccount[]>;
  public retrieve(carrierAccountId: string): Promise<CarrierAccount>;
  public delete(): Promise<{}>;
}

export declare class Easypost {
  public Address: typeof Address;
  public Parcel: typeof Parcel;
  public Shipment: typeof Shipment;

  public constructor(shipmentProviderSecret: string);
}