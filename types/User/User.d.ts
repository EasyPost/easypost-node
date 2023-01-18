import { IObjectWithId } from '../base';
import { IUserCreateParameters } from './UserCreateParameters';
import { Brand } from '../Brand';

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
   * All associated children
   */
  children: IUser[];

  /**
   * Creates a child user.
   *
   * @see https://www.easypost.com/docs/api/node#create-a-child-user
   *
   * @returns {Promise<User>} The created User.
   */
  public save(): Promise<User>;

  /**
   * Retrieve a child user.
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
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-user
   *
   * @returns {Promise<User>} The current authenticated user.
   */
  static retrieveMe(): Promise<User>;

  /**
   * Update the brand of the current authenticated user.
   *
   * @see https://www.easypost.com/docs/api/node#update-a-brand
   *
   * @param params The parameters to update the brand with.
   * @returns {Promise<Brand>} The updated Brand.
   */
  public updateBrand(params: object): Promise<Brand>;
}
