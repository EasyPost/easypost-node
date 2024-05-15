import { IVerifications } from "./Verifications";
import { IObjectWithId } from "../../utils/types";

/**
 * Address objects are used to represent people, places, and organizations in a number of contexts.
 * For example, a Shipment requires a to_address and from_address to accurately calculate rates and generate postage.
 *
 * Additionally, EasyPost offers several verification tools that can be used to detect deliverability issues, correct minor errors in spelling/formatting, and determine if an Address is residential or not (which has a significant effect on Shipment rating for many carriers).
 *
 * @see https://www.easypost.com/docs/api/node#address-object
 */
export type IAddress = IObjectWithId<"Address"> & {
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
  country: string;

  /**
   * Whether or not this address would be considered residential
   */
  residential?: boolean | null;

  /**
   * The specific designation for the address (only relevant if the address is a carrier facility)
   */
  carrier_facility?: string | null;

  /**
   * Name of the person. Both name and company can be included
   */
  name?: string | null;

  /**
   * Name of the organization. Both name and company can be included
   */
  company?: string | null;

  /**
   * Phone number to reach the person or organization
   */
  phone?: string | null;

  /**
   * Email to reach the person or organization
   */
  email?: string | null;

  /**
   * Federal tax identifier of the person or organization
   */
  federal_tax_id?: string | null;

  /**
   * State tax identifier of the person or organization
   */
  state_tax_id?: string | null;

  /**
   * The result of any verifications requested
   */
  verifications: IVerifications;
};
