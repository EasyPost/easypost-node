import { IObjectWithId } from '../base';
import { DeepPartial } from '../utils';
import { IAddressCreateParameters } from './AddressCreateParameters';
import { IVerifications } from './Verifications';

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
  mode: 'test' | 'production';
  object: 'Address';

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
