import { IObjectWithId } from "../../utils/types";

/**
 * Each Webhook contains the url which EasyPost will notify whenever an object in our system updates.
 * Several types of objects are processed asynchronously in the EasyPost system, so whenever an object updates, an Event is sent via HTTP POST to each configured webhook URL.
 * The Webhook object provides CRUD operations for all Webhooks.
 *
 * Currently, our recommended best practice for securing Webhooks involves using basic authentication and HTTPS on your endpoint.
 * This will help prevent any altering of any information communicated to you by EasyPost, prevent any third parties from seeing your webhooks in transit, and will prevent any third parties from masquerading as EasyPost and sending fraudulent data.
 * EasyPost performs certificate validation and requires any TLS-enabled (HTTPS) webhook recipients to have a certificate signed by a public trusted certification authority.
 * We do not support sending webhooks to over SSLv2, SSLv3, or any connection using so-called export-grade ciphers.
 * For documentation on how to set up your server with TLS, we recommend Mozilla's guide to Server-Side TLS and Qualys's SSL/TLS deployment best practices guide.
 *
 * In general, a Webhook's endpoint should return a status code of 2XX.
 * A 200 is preferred, but any 2XX status will indicate to our system that the Webhook request was successful.
 * Endpoints that return a large volume and rate of failures over a period of time will get automatically disabled by the system; a disabled Webhook can be re-enabled using the Webhook update endpoint.
 *
 * @see https://www.easypost.com/docs/api/node#webhook-object
 */
export type IWebhook = IObjectWithId<"Webhook"> & {
  /**
   * http://example.com
   */
  url: string;

  /**
   * the timestamp at which the webhook was most recently disabled (if any)
   */
  disabled_at: string;
};
