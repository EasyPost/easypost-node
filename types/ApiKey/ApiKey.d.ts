import { IObjectWithId } from '../base';

export declare interface IApiKey extends IObjectWithId<'ApiKey'> {
  /**
   * The actual key value to use for authentication
   */
  key: string;

  /**
   * When the API key was created
   */
  created_at: string;

  /**
   * Whether the API key is active or not
   */
  active: boolean;
}

export declare class ApiKey implements IApiKey {
  id: string;
  mode: 'test' | 'production';
  object: 'ApiKey';
  key: string;
  created_at: string;
  active: boolean;

  /**
   * Retrieve API Keys for a specified User.
   * Both production and test keys will be returned for a User and all of its children.
   * If the request is authenticated as a Child, only the API Keys for that Child will be returned.
   *
   * @see https://docs.easypost.com/docs/api-keys#retrieve-an-api-key
   *
   * @param {string} id - The ID of the user to retrieve keys for.
   * @returns {Promise<ApiKey[]>} - List of associated API Keys.
   */
  static retrieveApiKeysForUser(id: string): Promise<ApiKey[]>;

  /**
   * Retrieve all API keys associated with the current authenticated user.
   *
   * @see https://docs.easypost.com/docs/api-keys#retrieve-an-api-key
   *
   * @param {Object} [params] - Optional parameters for the request.
   * @returns {Promise<Object>} - An object containing the API keys associated with the current authenticated user and its child users.
   */
  static all(params?: Object): Promise<Object>;

  /**
   * Create an API key for a child or referral customer user.
   *
   * @see https://docs.easypost.com/docs/api-keys#create-an-api-key
   *
   * @param {string} mode - The mode for the API key (either "production" or "test").
   * @returns {Promise<ApiKey>} - The created API key.
   */
  static create(mode: string): Promise<ApiKey>;

  /**
   * Delete an API key for a child or referral customer user.
   *
   * @see https://docs.easypost.com/docs/api-keys#delete-an-api-key
   *
   * @param {string} id - The ID of the API key to delete.
   */
  static delete(id: string): void;

  /**
   * Enable a child or referral customer API key.
   *
   * @see https://docs.easypost.com/docs/api-keys#enable-an-api-key
   *
   * @param {string} id - The ID of the API key to enable.
   * @returns {Promise<ApiKey>} - The enabled API key.
   */
  static enable(id: string): Promise<ApiKey>;

  /**
   * Disable a child or referral customer API key.
   *
   * @see https://docs.easypost.com/docs/api-keys#disable-an-api-key
   *
   * @param {string} id - The ID of the API key to disable.
   * @returns {Promise<ApiKey>} - The disabled API key.
   */
  static disable(id: string): Promise<ApiKey>;
}
