import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IAddress } from "../address_service";
import { ICarrierAccount } from "../carrier_account_service";
import { IMessage, IShipment } from "../shipment_service";
import { IPickupRate } from "./PickupRate";

/**
 * The Pickup object allows you to schedule a pickup from your carrier from your customer's residence or place of business.
 * Supported carriers include:
 *  - Canada Post
 *  - Canpar
 *  - DHL Express
 *  - FedEx
 *  - Lasership
 *  - Loomis Express
 *  - LSO
 *  - Ontrac
 *  - UPS
 *  - USPS
 *  - Veho
 *
 * After a Pickup is successfully created, it will automatically fetch PickupRates for each CarrierAccount specified that supports scheduled pickups.
 * Then a PickupRate must be selected and purchased before the pickup can be successfully scheduled.
 *
 * @see https://www.easypost.com/docs/api/node#pickup-object
 */
export type IPickup = IObjectWithId<"Pickup"> &
  IDatedObject & {
    /**
     * An optional field that may be used in place of ID in some API endpoints
     */
    reference?: string | null;

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
    is_account_address?: boolean | null;

    /**
     * Additional text to help the driver successfully obtain the package
     */
    instructions?: string | null;

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
    carrier_accounts?: ICarrierAccount[] | null;

    /**
     * The list of different pickup rates across valid carrier accounts for the shipment
     */
    pickup_rates: IPickupRate[];
  };
