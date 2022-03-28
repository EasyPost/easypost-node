import { LabelFormat } from './LabelFormat';
import { TPrintCustomCode } from './PrintCustomCode';

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
  cod_method: 'CASH' | 'CHECK' | 'MONEY_ORDER';

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
  delivery_confirmation:
    | 'ADULT_SIGNATURE'
    | 'SIGNATURE'
    | 'NO_SIGNATURE'
    | 'INDIRECT_SIGNATURE'
    | 'ADULT_SIGNATURE_RESTRICTED'
    | 'SIGNATURE_RESTRICTED';

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
  dropoff_type:
    | 'REGULAR_PICKUP'
    | 'SCHEDULED_PICKUP'
    | 'RETAIL_LOCATION'
    | 'STATION'
    | 'DROP_BOX'
    | 'REQUEST_COURIER'
    | 'BUSINESS_SERVICE_CENTER';

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
  dry_ice_medical: boolean;

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
  endorsement:
    | 'ADDRESS_SERVICE_REQUESTED'
    | 'FORWARDING_SERVICE_REQUESTED'
    | 'CHANGE_SERVICE_REQUESTED'
    | 'RETURN_SERVICE_REQUESTED'
    | 'LEAVE_IF_NO_RESPONSE';

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
  hazmat:
    | 'PRIMARY_CONTAINED'
    | 'PRIMARY_PACKED'
    | 'PRIMARY'
    | 'SECONDARY_CONTAINED'
    | 'SECONDARY_PACKED'
    | 'SECONDARY'
    | 'ORMD'
    | 'LIMITED_QUANTITY'
    | 'LITHIUM';

  /**
   * Package will wait at carrier facility for pickup.
   */
  hold_for_pickup: boolean;

  /**
   * Incoterm negotiated for shipment.
   * Supported values are "EXW", "FCA", "CPT", "CIP", "DAT", "DAP", "DDP", "FAS", "FOB", "CFR", and "CIF".
   * Setting this value to anything other than "DDP" will pass the cost and responsibility of duties on to the recipient of the package(s), as specified by Incoterms rules
   */
  incoterm: 'EXW' | 'FCA' | 'CPT' | 'CIP' | 'DAT' | 'DAP' | 'DDP' | 'FAS' | 'FOB' | 'CFR' | 'CIF';

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
  label_format: LabelFormat;

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
    type: 'SENDER' | 'THIRD_PARTY' | 'RECEIVER' | 'COLLECT';

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
