import { IObjectWithId } from '../base';
import { DeepPartial } from '../utils';
import { IAddressCreateParameters } from './AddressCreateParameters';
import { IVerifications } from './Verifications';
import { IAddressListParameters } from './AddressListParameters';

/**
 * Address objects are used to represent people, places, and organizations in a number of contexts.
 * For example, a Shipment requires a to_address and from_address to accurately calculate rates and generate postage.
 *
 * Additionally, EasyPost offers several verification tools that can be used to detect deliverability issues, correct minor errors in spelling/formatting, and determine if an Address is residential or not (which has a significant effect on Shipment rating for many carriers).
 *
 * @see https://www.easypost.com/docs/api/node#address-object
 */
export declare interface IAddress extends IObjectWithId<'Address'> {
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
}

export declare class Address implements IAddress {
  public constructor(input: DeepPartial<IAddressCreateParameters>);

  id: string;
  mode: 'test' | 'production';
  object: 'Address';
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  zip: string;
  country: string;
  residential?: boolean | null;
  carrier_facility?: string | null;
  name?: string | null;
  company?: string | null;
  phone?: string | null;
  email?: string | null;
  federal_tax_id?: string | null;
  state_tax_id?: string | null;
  verifications: IVerifications;

  /**
   * Create an {@link Address address}.
   * @see https://www.easypost.com/docs/api/node#create-an-address
   * @param {Object} params - Parameters for the address to be created.
   * @returns {Address} - The created address.
   */
  static create(params: Object): Promise<Address>;

  /**
   * Retrieve a list of all Addresses.
   *
   * The Address List is a paginated list of all {@link Address} objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The has_more attribute indicates whether additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-addresses
   *
   * @param {Object} params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link Address addresses} and pagination information.
   */
  static all(params?: IAddressListParameters): Promise<{ addresses: Address[]; has_more: boolean }>;

  /**
   * Create and verify a new {@link Address} in one API call.
   *
   * Verify an {@link Address}
   *  - Verifying an {@link Address} before you ship is a great way to reduce issues with delivery.
   *    Creating a verified Address is as simple as including an enumerated list of the verifications you'd like EasyPost to perform in the `verify` or `verify_strict` url parameters.
   *    If any of the verification checks included in the `verify_strict` list fail an error will be returned from the API.
   *    The example below demonstrates the most common verification: "delivery", which checks that the address is deliverable and sets its residential delivery indicator.
   *
   *  - The most effective time to perform address verification is when your customer, or the person entering the delivery address, is present.
   *    When designing a shopping cart it is recommended to ask the shopper for their address and verify it on the spot.
   *    If verification fails, ask them to double-check their input; if they confirm that their data is correct, assume they know their address more correctly than the verification process.
   *
   * @see https://www.easypost.com/docs/api/node#create-and-verify-addresses
   *
   * @param {Object} params The parameters to create an {@link Address} with.
   * @returns {Promise<Address>} The created and verified {@link Address}.
   */
  static createAndVerify(params: Object): Promise<Address>;

  /**
   * Verify an {@link Address}.
   *
   * @see https://www.easypost.com/docs/api/node#create-and-verify-addresses
   *
   * @param addressId Unique, begins with "adr_"
   * @returns {Promise<Address>} The verified {@link Address}.
   */
  static verifyAddress(addressId: string): Promise<Address>;

  /**
   * An Address can be retrieved by its id.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-an-address
   *
   * @param addressId Unique, begins with "adr_"
   * @returns {Promise<Address>} The verified {@link Address} address.
   */
  static retrieve(addressId: string): Promise<Address>;
}
