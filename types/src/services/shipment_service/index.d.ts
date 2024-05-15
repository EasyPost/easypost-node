import EasyPost from '../..';
import { IRate, ISmartRate } from '../rate_service';
import { IOptions, LabelFormat } from './Options';
import { IShipmentCreateParameters } from './ShipmentCreateParameters';
import { IShipmentListParameters } from './ShipmentListParameters';
export * from './Form';
export * from './Message';
export * from './PostageLabel';
export * from './Shipment';
export * from './ShipmentCreateParameters';
export * from './ShipmentListParameters';
export * from './Options';
declare const _default: (easypostClient: EasyPost) => {
  new (): {};
  /**
   * Create a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#create-a-shipment EasyPost API Documentation} for more information.
   * @param params - The parameters to create a shipment with.
   * @returns - The created shipment.
   */
  create(params: IShipmentCreateParameters): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Purchase a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to purchase.
   * @param rate - The rate to purchase the shipment with.
   * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
   * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
   * @returns - The purchased shipment.
   */
  buy(
    id: string,
    rate: IRate | string,
    insuranceAmount?: number | null,
    endShipperId?: string | null,
  ): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Convert the label format of a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#convert-the-label-format-of-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to convert the label format of.
   * @param format - The format to convert the label to.
   * @returns - The shipment with the converted label format.
   */
  convertLabelFormat(
    id: string,
    format: LabelFormat,
  ): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Regenerate {@link Rate rates} for a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#regenerate-rates-for-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to regenerate rates for.
   * @returns - The shipment with regenerated rates.
   */
  regenerateRates(id: string): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Get SmartRates for a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-time-in-transit-statistics-across-all-rates-for-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to get SmartRates for.
   * @returns - The SmartRates for the shipment.
   */
  getSmartRates(id: string): Promise<import('../base_service').EasyPostObject<ISmartRate[]>>;
  /**
   * Insure a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#insure-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to insure.
   * @param amount - The amount to insure the shipment for.
   * @returns - The insured shipment.
   */
  insure(
    id: string,
    amount: number | string,
  ): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Generate a form for a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#create-form EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to generate a form for.
   * @param formType - The type of form to generate.
   * @param [formOptions] - Options for the form.
   * @returns - The shipment with the generated form attached.
   */
  generateForm(
    id: string,
    formType: string,
    formOptions?: IOptions,
  ): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Refund a {@link Shipment shipment}.
   * See {@link https://www.easypost.com/docs/api/node#refund-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to refund.
   * @returns - The refunded shipment.
   */
  refund(id: string): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Get the lowest SmartRate of a shipment.
   * @param id - The ID of the shipment to get the lowest SmartRate of.
   * @param deliveryDays - The number of days the shipment will take to deliver.
   * @param deliveryAccuracy - The accuracy of the delivery days.
   * @returns - The lowest SmartRate of the shipment.
   */
  lowestSmartRate(
    id: string,
    deliveryDays: number,
    deliveryAccuracy: keyof ISmartRate['time_in_transit'],
  ): Promise<ISmartRate>;
  /**
   * Retrieve all {@link Shipment shipments} associated with the current authenticated user.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-list-of-shipments EasyPost API Documentation} for more information.
   * @param [params] - Parameters to filter the shipments by.
   * @returns - An object containing a list of {@link Shipment shipments} and pagination information.
   */
  all(params?: IShipmentListParameters): Promise<{
    shipments: (import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      })[];
    _params: any;
    has_more: boolean;
  }>;
  /**
   * Retrieve the next page of Shipment collection.
   * @param shipments An object containing a list of {@link Shipment shipments} and pagination information.
   * @param pageSize The number of records to return on each page
   * @returns The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
   */
  getNextPage(
    shipments: {
      shipments: any[];
    },
    pageSize?: null,
  ): Promise<{
    shipments: (import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      })[];
    _params: any;
    has_more: boolean;
  }>;
  /**
   * Retrieve a {@link Shipment shipment} by its ID.
   * See {@link https://www.easypost.com/docs/api/node#retrieve-a-shipment EasyPost API Documentation} for more information.
   * @param id - The ID of the shipment to retrieve.
   * @returns - The shipment with the given ID.
   */
  retrieve(id: string): Promise<
    import('../../utils/types').IBaseObject<'Shipment'> & {
      id: string;
      mode: 'test' | 'production';
      object: 'Shipment';
    } & import('../../utils/types').IDatedObject & {
        reference?: string | null | undefined;
        to_address: import('..').IAddress;
        from_address: import('..').IAddress;
        return_address?: import('..').IAddress | null | undefined;
        buyer_address?: import('..').IAddress | null | undefined;
        parcel: import('..').IParcel
        /**
         * Purchase a {@link Shipment shipment}.
         * See {@link https://www.easypost.com/docs/api/node#buy-a-shipment EasyPost API Documentation} for more information.
         * @param id - The ID of the shipment to purchase.
         * @param rate - The rate to purchase the shipment with.
         * @param [insuranceAmount] - The amount of insurance to purchase for the shipment.
         * @param [endShipperId] - The ID of the end shipper to purchase the shipment with.
         * @returns - The purchased shipment.
         */;
        customs_info?: import('..').ICustomsInfo | null | undefined;
        scan_form: import('..').IScanForm;
        forms: import('./Form').IForm[];
        insurance: import('..').IInsurance;
        rates: IRate[];
        selected_rate: IRate;
        postage_label: import('./PostageLabel').IPostageLabel;
        messages: import('./Message').IMessage[];
        options?: IOptions | null | undefined;
        is_return?: boolean | null | undefined;
        tracking_code: string;
        usps_zone: string;
        status: string;
        tracker: import('..').ITracker;
        fees: import('..').IFee[];
        refund_status: 'submitted' | 'refunded' | 'rejected';
        batch_id: string;
        batch_status: import('..').TBatchStatus;
        batch_message: string;
      } & {
        lowestRate: (carriers?: string[] | undefined, services?: string[] | undefined) => IRate;
      }
  >;
  /**
   * Retrieves the estimated delivery date of each Rate via SmartRate.
   * @param id
   * @param plannedShipDate
   * @returns - An array of the estimated delivery date and rates.
   */
  retrieveEstimatedDeliveryDate(
    id: string,
    plannedShipDate: string,
  ): Promise<import('../base_service').EasyPostObject<IRate[]>>;
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
