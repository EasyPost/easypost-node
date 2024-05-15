import EasyPost from '../..';
import { IPaymentMethod } from '../billing_service';
import { IRefund } from '../refund_service';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Add an existing Stripe payment method to a {@link User referral customer's} account.
   * @param stripeCustomerId - The Stripe account's ID.
   * @param paymentMethodReference - Reference of Stripe payment method.
   * @param [priority] - Which priority to set the payment method to ('primary' or 'secondary').
   * @returns - A JSON object representing the payment method.
   */
  addPaymentMethod(
    stripeCustomerId: string,
    paymentMethodReference: string,
    priority?: 'primary' | 'secondary',
  ): Promise<IPaymentMethod>;
  /**
   * Refund by amount for a recent payment.
   * @param refundAmount - Amount to be refunded by cents.
   * @returns - A JSON object representing the refund.
   */
  refundByAmount(refundAmount: number): Promise<IRefund>;
  /**
   * Refund a payment by a payment log ID.
   * @param paymentLogId - ID of the payment log.
   * @returns - Returns BetaPaymentRefund object.
   */
  refundByPaymentLog(paymentLogId: string): Promise<import('superagent/lib/node/response')>;
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
