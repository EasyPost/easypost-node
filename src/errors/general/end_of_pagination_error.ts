import Constants from '../../constants';
import EasyPostError from '../easypost_error';

/**
 * The EndOfPaginationError class is used to represent an error that no more page can be retrieved
 * @sealed
 * @extends EasyPostError
 * @param {string} [message] - The message to be displayed when the error is logged.
 */
export default class EndOfPaginationError extends EasyPostError {
  constructor() {
    super({ message: Constants.END_OF_PAGINATION });
  }
}
