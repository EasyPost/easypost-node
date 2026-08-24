import { IEmbeddablesSessionCreateParameters } from './EmbeddablesSessionCreateParameters';

/**
 * Class representing an EasyPost EmbeddablesSession object.
 *
 */
export declare interface IEmbeddablesSession {
  /** Always returns "EmbeddablesSession". */
  object: string;

  /** Short-lived, one-time-use token that authorizes an Embeddables Components session. Must be provided to the client-side Embeddables script to initialize the component. */
  session_id: string;

  /** ISO 8601 timestamp indicating when the session was created. */
  created_at: string;

  /** ISO 8601 timestamp indicating when the session expires. */
  expires_at: string;
}

declare class EmbeddablesSession implements IEmbeddablesSession {
  public constructor(input: IEmbeddablesSessionCreateParameters);

  object: 'EmbeddablesSession';
  session_id: string;
  created_at: string;
  expires_at: string;

  /**
   * Create a Portal Session.
   *
   * @see https://docs.easypost.com/docs/embeddables#create-an-embeddable-session
   *
   * @param {Object} params The parameters to create a {@link EmbeddablesSession} with.
   * @returns {Promise<EmbeddablesSession>} The {@link EmbeddablesSession}.
   */
  static createSession(params: Object): Promise<EmbeddablesSession>;
}

export type { EmbeddablesSession };
