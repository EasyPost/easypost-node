export declare interface IWebhookCreateParameters {
  url: string;
  webhook_secret?: string;
  custom_headers?: Array<{ key: string; value: string }>;
}
