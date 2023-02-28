import { IAddress } from '../Address';
import { IDatedObject, IObjectWithId } from '../base';
import { IScanFormCreateParameters } from './ScanFormCreateParameters';
import { IScanFormListParameters } from './ScanFormListParameters';

/**
 * A ScanForm can be created to speed up and simplify the carrier pickup process.
 * The ScanForm is one document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
 * The following criteria must met before creation:
 *  - Refunded Shipments cannot be added
 *  - Each Shipment must have the same origin address
 *  - Shipments must all be dated (using the label_date option) on or after the date the form is generated
 *  - Shipments cannot be added to more than one ScanForm
 *  - Existing ScanForms may not be updated with additional Shipments. If a ScanForm already exists, and new Shipments need to be added, a new ScanForm must be created.
 *  - Shipments should be provided in the form of an array
 *
 * @see https://www.easypost.com/docs/api/node#scan-form-object
 */
export declare interface IScanForm extends IObjectWithId<'ScanForm'>, IDatedObject {
  /**
   * Current status.
   * Possible values are "creating", "created" and "failed"
   */
  status: 'creating' | 'created' | 'failed';

  /**
   * Human-readable message explaining any failures
   */
  message: string;

  /**
   * Address that the Shipments will be shipped from
   */
  address: IAddress;

  /**
   * Tracking codes included on the ScanForm
   */
  tracking_codes: string[];

  /**
   * Url of the document
   */
  form_url: string;

  /**
   * File format of the document
   */
  form_file_type: string;

  /**
   * The id of the associated Batch. Unique, starts with "batch_"
   */
  batch_id: string;
}

export declare class ScanForm implements IScanForm {
  public constructor(input: IScanFormCreateParameters);

  address: IAddress;
  batch_id: string;
  created_at: string;
  form_file_type: string;
  form_url: string;
  id: string;
  message: string;
  mode: 'test' | 'production';
  object: 'ScanForm';
  status: 'creating' | 'created' | 'failed';
  tracking_codes: string[];
  updated_at: string;

  /**
   * A ScanForm can be created to speed up and simplify the carrier pickup process.
   * The Scan Form is one document that can be scanned to mark all included tracking codes as "Accepted for Shipment" by the carrier.
   *
   * @see https://www.easypost.com/docs/api/node#scan-form
   *
   * @returns {Promise<ScanForm>} The created ScanForm
   *
   * @param {Object} params The parameters to create an {@link ScanForm} with.
   * @returns {Promise<ScanForm>} The created and verified {@link ScanForm}.
   */
  static create(params: Object): Promise<ScanForm>;

  /**
   * The ScanForm List is a paginated list of all ScanForm objects associated with the given API Key.
   * It accepts a variety of parameters which can be used to modify the scope.
   * The `has_more` attribute indicates whether additional pages can be requested.
   * The recommended way of paginating is to use either the `before_id` or `after_id` parameter to specify where the next page begins.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-scan-forms
   *
   * @param {object} params The parameters to use for the request.
   * @returns {Object} - An object containing a list of {@link ScanForm scanforms} and pagination information.
   */
  static all(
    params?: IScanFormListParameters,
  ): Promise<{ scan_forms: ScanForm[]; has_more: boolean }>;

  /**
   * A ScanForm can be retrieved by either its id or reference.
   * However, it is recommended to use EasyPost's provided identifiers because uniqueness on reference is not enforced.
   *
   * @see https://www.easypost.com/docs/api/node#retrieve-a-scan-form
   *
   * @param {string} scanFormId Unique, begins with "sf_".
   */
  static retrieve(scanFormId: string): Promise<ScanForm>;
}
