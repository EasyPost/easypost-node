import EasyPostObject from './easypost_object';

/**
 * An {@link https://docs.easypost.com/docs/api-keys ApiKey} represents an authentication token that can be used to make requests to the EasyPost API.
 * @public
 * @extends EasyPostObject
 */
export default class ApiKey extends EasyPostObject {
  static active;
  static key;
}
