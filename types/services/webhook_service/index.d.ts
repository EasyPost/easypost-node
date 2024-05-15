import EasyPost from '../..';
import { IWebhook } from './Webhook';
import { IWebhookCreateParameters } from './WebhookCreateParameters';
import { IWebhookListParameters } from './WebhookListParameters';
export * from './Webhook';
export * from './WebhookCreateParameters';
export * from './WebhookListParameters';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Webhook webhook}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-webhook EasyPost API Documentation} for more information.
   * @param params - The parameters to create a webhook with.
   * @returns - The created webhook.
   */
  create(
    params: IWebhookCreateParameters,
  ): Promise<import('../base_service').EasyPostObject<IWebhook>>;
  /**
   * Update a {@link Webhook webhook}.
   * A disabled webhook will be re-enabled if it is updated.
   * See {@link https://www.easypost.com/docs/api/node#update-a-webhook EasyPost API Documentation} for more information.
   * @param id - The ID of the webhook to update.
   * @param params - The parameters to update the webhook with.
   * @returns - The updated webhook.
   */
  update(
    id: string,
    params: Partial<IWebhookCreateParameters>,
  ): Promise<import('../base_service').EasyPostObject<IWebhook>>;
  /**
   * Delete a {@link Webhook webhook}.
   * See {@link https://www.easypost.com/docs/api/node#delete-a-webhook EasyPost API Documentation} for more information.
   * @param id - The ID of the webhook to delete.
   * @returns - A promise that resolves if the webhook was successfully deleted.
   */
  delete(id: string): Promise<void>;
  /**
   * Retrieve all {@link Webhook webhooks} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#list-a-webhooks EasyPost API Documentation} for more information.
   * @param [params]
   * @returns
   */
  all(params?: IWebhookListParameters): Promise<
    {
      webhooks: IWebhook[];
    } & {
      _params: any;
    } & {
      has_more: boolean;
    }
  >;
  /**
   * Retrieve a {@link Webhook webhook} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-webhook EasyPost API Documentation} for more information.
   * @param id - The ID of the webhook to retrieve.
   * @returns - The retrieved webhook.
   */
  retrieve(id: string): Promise<import('../base_service').EasyPostObject<IWebhook>>;
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
