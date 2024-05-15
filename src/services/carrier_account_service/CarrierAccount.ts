import { IDatedObject, IObjectWithId } from "../../utils/types";
import { ICarrierAccountCreateParameters } from "./CarrierAccountCreateParameters";
import { ICarrierAccountFields } from "./CarrierAccountFields";

/**
 * A CarrierAccount encapsulates your credentials with the carrier.
 * The CarrierAccount object provides CRUD operations for all CarrierAccounts.
 *
 * Each EasyPost account is automatically provided a USPS account managed by EasyPost.
 *
 * Other operations, such as Shipment creation, can reference CarrierAccounts to reduce the scope of data returned.
 * For instance, you may have multiple warehouses that need to use distinct FedEx SmartPost credentials to request the correct rates.
 * Rate objects will include a `carrier_account_id` field which can be used to determine the account used for rating.
 *
 * @see https://www.easypost.com/docs/api/node#carrier-account-object
 */
export type ICarrierAccount = IObjectWithId<"CarrierAccount"> &
  IDatedObject & {
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
    clone?: boolean | null;

    /**
     * An optional, user-readable field to help distinguish accounts
     */
    description?: string | null;

    /**
     * An optional field that may be used in place of carrier_account_id in other API endpoints
     */
    reference?: string | null;

    /**
     * The name used when displaying a readable value for the type of the account
     */
    readable: string;

    /**
     * Unlike the "credentials" object contained in "fields", this nullable object contains just raw credential pairs for client library consumption
     */
    credentials?: object | null;

    /**
     * Unlike the "test_credentials" object contained in "fields", this nullable object contains just raw test_credential pairs for client library consumption
     */
    test_credentials?: object | null;

    /**
     * Billing type of the carrier account
     */
    billing_type: string | null;
  };
