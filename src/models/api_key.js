import EasyPostObject from './easypost_object';

/**
 * An {@link https://www.easypost.com/docs/api/node#api-keys ApiKey} represents an authentication token that can be used to make requests to the EasyPost API.
 * @public
 * @extends EasyPostObject
 */
export default class ApiKey extends EasyPostObject {
  static active;
  static key;
}
