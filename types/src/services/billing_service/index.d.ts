import EasyPost from '../..';
export * from './PaymentMethod';
export type Priority = 'primary' | 'secondary';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Fund your EasyPost wallet by charging your primary or secondary payment method on file.
   * See {@link https://www.easypost.com/docs/api/node#add-funds-to-your-wallet-one-time-charge EasyPost API Documentation} for more information.
   * @param amount - The amount to charge to your payment method.
   * @param priority - The priority of the payment method to charge. Can be either 'primary' or 'secondary'.
   */
  fundWallet(amount: string, priority?: Priority): Promise<void>;
  /**
   * Delete a payment method from the current authenticated user's account.
   * See {@link https://www.easypost.com/docs/api/node#delete-a-payment-method EasyPost API Documentation} for more information.
   * @param priority - The priority of the payment method to delete. Can be either 'primary' or 'secondary'.
   */
  deletePaymentMethod(priority: Priority): Promise<void>;
  /**
   * Retrieve all payment methods associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-payment-methods EasyPost API Documentation} for more information.
   * @returns {Object} - An object containing the payment methods associated with the current authenticated user.
   */
  retrievePaymentMethods(): Promise<any>;
  /**
   * Get payment info (type of the payment method and ID of the payment method)
   * This function is intended for internal use only, please avoid using this function
   * @private
   * @param {String} priority - The priority of the payment method to retrieve. Can be either 'primary' or 'secondary'.
   * @returns {string[]} - An array of two strings, the first being the endpoint of the payment method and the second being the ID of the payment method.
   */
  _getPaymentInfo(priority: Priority): Promise<any[]>;
  _convertToEasyPostObject<A extends unknown>(
    response: A,
    params?: any,
  ): import('../base_service').EasyPostObject<A>;
  _create<A_1>(url: string, params: object): Promise<import('../base_service').EasyPostObject<A_1>>;
  _all<A_2>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<
    A_2 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  _retrieve<A_3>(url: string): Promise<import('../base_service').EasyPostObject<A_3>>;
  _getNextPage<A_4 extends Record<string, any>>(
    url: string,
    key: keyof A_4,
    collection: A_4,
    pageSize?: number | null,
    optionalParams?: Record<string, string>,
  ): Promise<
    A_4 & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
};
export default _default;
