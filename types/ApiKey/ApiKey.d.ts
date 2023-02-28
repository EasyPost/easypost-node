import { IObjectWithId } from '../base';
import { DeepPartial } from '../utils';

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
   * Both production and test keys will be returned for a User and all of its children.
   * If the request is authenticated as a Child, only the API Keys for that Child will be returned.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-an-api-key
   *
   * @param apiKeyId Unique, begins with "user_"
   * @returns {Promise<ApiKey>} The verified {@link ApiKey}.
   */
  static retrieve(apiKeyId: string): Promise<ApiKey>;
}
