import { IObjectWithId } from '../base';
import { DeepPartial } from '../utils';
import { IEndShipperCreateParameters } from './EndShipperCreateParameters';
import { IEndShipperListParameters } from './EndShipperListParameters';

/**
 * The EndShipper API is for platforms purchasing postage on behalf of their users, the EndShipper.
 * Platforms must assert the EndShipper details, as the EndShipper is ultimately responsible for what is in the box.
 * Multiple labels purchased for the same EndShipper must use the same EndShipper identity (API object).
 * EndShipper objects must be created prior to buying a Shipment. Once EndShipper objects have been created,
 * you must keep track of their public id in order to use them during a label buy.
 *
 * @see https://www.easypost.com/docs/api/node#endshipper
 */
export declare interface IEndshipper extends IObjectWithId<'EndShipper'> {
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
}

export declare class EndShipper implements IEndshipper {
  public constructor(input: DeepPartial<IEndShipperCreateParameters>);
  id: string;
  mode: 'test' | 'production';
  object: 'EndShipper';
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  zip: string;
  country: string;
  name?: string | null;
  company?: string | null;
  phone?: string | null;
  email?: string | null;

  /**
   * The EndShipper object is meant to represent the person or business entity responsible for the
   * shipment and not necessarily the shipping location.
   * EndShipper objects are fully-qualified Address objects and require every field to be filled with two exceptions:
   * name and company fields. At least one of these fields must be filled (when both are present, name will take precedence).
   * street2 field. This fieldcan be empty if the address does not include multiple lines.
   *
   * @see https://www.easypost.com/docs/api/node#create-an-endshipper
   *
   * @param {Object} params The parameters to create an {@link EndShipper} with.
   * @returns {Promise<EndShipper>} The created and verified {@link EndShipper}.
   */
  static create(params: Object): Promise<EndShipper>;

  /**
   * An EndShipper object may be updated using the EndShipper API.
   * All required fields for creating an EndShipper are required in an update request. Partial updates are not supported.
   *
   * @see https://www.easypost.com/docs/api/node#update-an-endshipper
   *
   * @param id Unique, start with "es_".
   * @param params The parameters to update an {@link EndShipper} with.
   * @returns {Promise<EndShipper>} The updated {@link EndShipper}.
   */
  static update(id: string, params: Object): Promise<EndShipper>;

  /**
   * Similar to retrieving a list of EndShippers, you can retrieve an individual EndShipper.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-an-endshipper
   *
   * @param id Unique, start with "es_".
   * @returns {Promise<EndShipper>} The retrieved {@link EndShipper}.
   */
  static retrieve(id: string): Promise<EndShipper>;

  /**
   * List the EndShippers that have been created.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-endshippers
   *
   * @param params - The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link EndShipper endshippers} and pagination information.
   */
  static all(
    params: IEndShipperListParameters,
  ): Promise<{ endshippers: EndShipper[]; has_more: boolean }>;
}
