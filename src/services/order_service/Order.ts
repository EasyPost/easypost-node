import { IDatedObject, IObjectWithId } from "../../utils/types";
import { IAddress } from "../address_service";
import { IRate } from "../rate_service";
import { IMessage, IShipment } from "../shipment_service";

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
export type IOrder = IObjectWithId<"Order"> &
  IDatedObject & {
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
    is_return?: boolean | null;
  };
