import { IBaseObject } from '../../base';
import { ICarrierTypeFields } from './CarrierTypeFields';

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
export declare interface ICarrierType extends IBaseObject<'CarrierType'> {
  /**
   * Specifies the CarrierAccount type.
   */
  type: string;

  /**
   * Contains at least one of the following keys: "auto_link", "credentials", "test_credentials", and "custom_workflow"
   */
  fields: ICarrierTypeFields;
}

export declare class CarrierType implements ICarrierType {
  type: string;
  fields: ICarrierTypeFields;
  object: 'CarrierType';

  /**
   * The CarrierType list is an unpaginated list of all carrier types available to the account of the given API key.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-available-carrier-types
   * @requires production API Key.
   *
   * @returns {Object} - An object containing a list of {@link CarrierType carrier types}.
   */
  static all(): Promise<CarrierType[]>;
}
