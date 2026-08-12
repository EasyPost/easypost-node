import baseService from './base_service';
import Claim from '../models/claim';

type ClaimCreateParameters = Record<string, unknown> & {
  tracking_code?: string | null;
  type?: string | null;
  amount?: string | null;
  email_evidence_attachments?: string[] | null;
  invoice_attachments?: string[] | null;
  supporting_documentation_attachments?: string[] | null;
  description?: string | null;
  recipient_name?: string | null;
  contact_email?: string | null;
  payment_method?: string | null;
};
type ClaimCollection = Record<string, unknown>;
type ClaimListResponse = { claims: Claim[]; has_more: boolean };

export default (easypostClient) =>
  /**
   * The ClaimService class provides methods for interacting with EasyPost {@link Claim} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ClaimService extends baseService(easypostClient) {
    /**
     * Create a {@link Claim claim} record.
     * @param {Object} params - Parameters for the claim to be created.
     * @returns {Claim} - The created claim.
     */
    static async create(params: ClaimCreateParameters): Promise<Claim> {
      const url = 'claims';

      return this._create(url, params);
    }

    /**
     * Retrieve all {@link Claim} records associated with the current authenticated user.
     * @param {Object} [params] - Parameters to filter the claim records.
     * @returns {Object} - An object containing the list of {@link Claim claim} records and pagination information.
     */
    static async all(params: Record<string, unknown> = {}): Promise<ClaimListResponse> {
      const url = 'claims';

      return this._all(url, params);
    }

    /**
     * Retrieve the next page of Claim collection.
     * @param {Object} claims An object containing a list of {@link Claim claims} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    static async getNextPage(
      claims: ClaimCollection,
      pageSize: number | null = null,
    ): Promise<ClaimListResponse> {
      const url = 'claims';
      return this._getNextPage(url, 'claims', claims, pageSize);
    }

    /**
     * Retrieve a {@link Claim claim} record by its ID.
     * @param {string} id - The ID of the claim to retrieve.
     * @returns {Claim} - The retrieved claim.
     */
    static async retrieve(id: string): Promise<Claim> {
      const url = `claims/${id}`;

      return this._retrieve(url);
    }

    /**
     * Cancel a {@link Claim claim} record by its ID.
     * @param {string} id - The ID of the claim to be canceled.
     * @returns {Claim} - The canceled claim.
     */
    static async cancel(id: string): Promise<Claim> {
      const url = `claims/${id}/cancel`;
      return this._create(url, {});
    }
  };
