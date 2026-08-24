import { TClaimPaymentMethod } from './ClaimPaymentMethod';
import { TClaimType } from './ClaimType';

export declare interface IClaimCreateParameters {
  /** The tracking code of the shipment to file a claim for. */
  tracking_code: string;

  /** The type of claim to file. */
  type: TClaimType;

  /** The amount being claimed for reimbursement. */
  amount: string;

  /**
   * Email-based files to attach to the claim for evidence. Each file must be a
   * base64-encoded string.
   */
  email_evidence_attachments?: string[];

  /**
   * Invoices to attach to the claim for evidence. Each file must be a
   * base64-encoded string.
   */
  invoice_attachments?: string[];

  /**
   * Additional supporting documents to attach to the claim. Required if the
   * type is damage or theft. Each file must be a base64-encoded string.
   */
  supporting_documentation_attachments?: string[];

  /** Detailed description of the claim. */
  description: string;

  /** The name of the recipient of the reimbursement. */
  recipient_name: string;

  /** The email address of the contact for the claim. */
  contact_email: string;

  /** The payment method for the claim reimbursement. */
  payment_method: TClaimPaymentMethod;
}
