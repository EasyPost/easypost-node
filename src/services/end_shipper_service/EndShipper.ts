import { IObjectWithId } from "../../utils/types";

/**
 * The EndShipper API is for platforms purchasing postage on behalf of their users, the EndShipper.
 * Platforms must assert the EndShipper details, as the EndShipper is ultimately responsible for what is in the box.
 * Multiple labels purchased for the same EndShipper must use the same EndShipper identity (API object).
 * EndShipper objects must be created prior to buying a Shipment. Once EndShipper objects have been created,
 * you must keep track of their public id in order to use them during a label buy.
 *
 * @see https://www.easypost.com/docs/api/node#endshipper
 */
export type IEndshipper = IObjectWithId<"EndShipper"> & {
  /**
   * Name of responsible person (conditionally required)
   */
  name?: string | null;

  /**
   * Name of responsible company (conditionally required)
   */
  company?: string | null;

  /**
   * First line of the address
   */
  street1?: string | null;

  /**
   * Second line of the address
   */
  street2?: string | null;

  /**
   * City the address is located in
   */
  city?: string | null;

  /**
   * State or province the address is located in
   */
  state?: string | null;

  /**
   * ZIP or postal code the address is located in
   */
  zip: string;

  /**
   * ISO 3166 country code for the country the address is located in
   */
  country?: string;

  /**
   * Phone number to reach the person or organization
   */
  phone?: string | null;

  /**
   * Email to reach the person or organization
   */
  email?: string | null;
};
