export declare interface IEmbeddablesSessionCreateParameters {
  /** The integrator’s domain in bare-host format (e.g., example.com), excluding protocol and subdomains. */
  origin_host: string;

  /** The User ID of the sub account for which the embeddable session is being created. */
  user_id: string;
}
