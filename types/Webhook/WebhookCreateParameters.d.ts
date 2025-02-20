export declare interface IWebhookCreateParameters {
  url: string;
  secret?: string;
  custom_headers?: Array<{ key: string; value: string }>;
}
