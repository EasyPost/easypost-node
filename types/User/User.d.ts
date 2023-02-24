import { IObjectWithId } from '../base';
import { IUserCreateParameters } from './UserCreateParameters';

/**
 * The User object can be used to manage your own account and to create child accounts.
 * Only a Production mode API key can be used to make requests against the Users API.
 *
 * Balance and recharge values on User objects are expressed in higher precision USD.
 *
 * @see https://www.easypost.com/docs/api/node#user-object
 */
export declare interface IUser extends IObjectWithId<'User'> {
  /**
   * The ID of the parent user object.
   * Top-level users are defined as users with no parent
   */
  parent_id: string;

  /**
   * First and last name required
   */
  name: string;

  /**
   * Required
   */
  email: string;

  /**
   * Optional
   */
  phone_number?: string | null;

  /**
   * Formatted as string "XX.XXXXX"
   */
  balance: string;

  /**
   * Cost per shipment purchase, formatted as string "XX.XXXXX"
   */
  price_per_shipment: string;
  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  recharge_amount: string;

  /**
   * USD formatted dollars and cents, delimited by a decimal point
   */
  secondary_recharge_amount: string;

  /**
   * Number of cents USD that when your balance drops below, we automatically recharge your account with your primary payment method.
   */
  recharge_threshold: string;

  /**
   * The fee rate for convenience fees
   */
  cc_fee_rate: string;

  /**
   * The fee rate for insurance purchases
   */
  insurance_fee_rate: string;

  /**
   * The minimum cost for insurance purchases
   */
  insurance_fee_minimum: string;

  /**
   * All associated children
   */
  children: IUser[];
}

export declare class User implements IUser {
  public constructor(input: IUserCreateParameters);

  id: string;
  mode: 'test' | 'production';
  object: 'User';
  reference?: string | null;
  parent_id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  balance: string;
  price_per_shipment: string;
  recharge_amount: string;
  secondary_recharge_amount: string;
  recharge_threshold: string;
  cc_fee_rate: string;
  insurance_fee_rate: string;
  insurance_fee_minimum: string;
  children: IUser[];

  /**
   * Creates a child user.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-child-user
   * @requires production API Key.
   *
   * @param {Object} params The parameters to create an {@link User} with.
   * @returns {Promise<User>} The created User.
   */
  static create(params: Object): Promise<User>;

  /**
   * Retrieve a child user.
   * @requires production API Key.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-user
   *
   * @param {string} id ID of the child user to retrieve
   * @param urlPrefix Override the prefix to use for the request URL, optional
   * @returns {Promise<User>} The associated User.
   */
  static retrieve(id: string, urlPrefix: string): Promise<User>;

  /**
   * Retrieve the current authenticated user.
   * @requires production API Key.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-user
   *
   * @returns {Promise<User>} The current authenticated user.
   */
  static retrieveMe(): Promise<User>;

  /**
   * Just like retrieving a User they can be updated using the same patterns.
   * Passing an id will allow the update of a child or the authenticated User.
   * Passing no id will update the authenticated User.
   * Since children also have the ability to authenticate themselves they can be updated without passing an id.
   * Children may only have their "name" field updated, all other fields are ignored.
   * Update requests for Users are partial updates. Only attributes specifically passed in will be updated.
   * The current_password attribute is required when updating email or password.
   *
   * @see https://www.easypost.com/docs/api/node#update-a-user
   * @requires production API Key.
   *
   * @param id The id of the user
   * @param params The parameters to update the {@link User} with
   * @returns {Promise<User>} The associated User.
   */
  static update(id: string, params: Object): Promise<User>;

  /**
   * Childen may be removed from its parent. The parent account's Production API key must be used for the request,
   * a child may not remove itself from its parent.
   * A successful delete will return HTTP status 204 and an empty object for JSON content.
   * @param id The id of the users
   * @requires production API Key.
   */
  static delete(id: string): void;
}
